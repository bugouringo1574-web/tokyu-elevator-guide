/**
 * 東急エレベーターGO！ アプリケーションロジック
 */

document.addEventListener('DOMContentLoaded', () => {
  // 状態管理
  const state = {
    currentLat: null,
    currentLng: null,
    currentLocationName: '',
    selectedLineFilter: 'all',
    searchQuery: '',
    savedResearchLogs: JSON.parse(localStorage.getItem('tokyu_elevator_research_logs') || '[]'),
    currentSelectedStationId: 'jiyugaoka'
  };

  // DOM要素キャッシュ
  const tabButtons = document.querySelectorAll('.nav-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  // GPS関連
  const btnGetGps = document.getElementById('btn-get-gps');
  const gpsStatusBar = document.getElementById('gps-status-bar');
  const gpsStatusText = document.getElementById('gps-status-text');
  const simButtons = document.querySelectorAll('.btn-sim');

  // 最寄り結果関連
  const nearestContainer = document.getElementById('nearest-result-container');
  const navEmptyState = document.getElementById('nav-empty-state');
  const nearestStationName = document.getElementById('nearest-station-name');
  const nearestEvTitle = document.getElementById('nearest-ev-title');
  const nearestEvFloor = document.getElementById('nearest-ev-floor');
  const nearestEvAddress = document.getElementById('nearest-ev-address');
  const nearestEvDistance = document.getElementById('nearest-ev-distance');
  const nearestEvWalk = document.getElementById('nearest-ev-walk');
  const nearestFeatures = document.getElementById('nearest-features');
  const nearestRouteSteps = document.getElementById('nearest-route-steps');
  const btnOpenMap = document.getElementById('btn-open-map');
  const btnViewStationDetail = document.getElementById('btn-view-station-detail');
  const otherNearestList = document.getElementById('other-nearest-list');

  // 駅一覧関連
  const stationsListContainer = document.getElementById('stations-list-container');
  const filterChips = document.querySelectorAll('[data-line-filter]');
  const stationSearchInput = document.getElementById('station-search-input');

  // 自由研究関連
  const researchStationSelect = document.getElementById('research-station-select');
  const researchElevatorSelect = document.getElementById('research-elevator-select');
  const researchChecklistContainer = document.getElementById('research-checklist-container');
  const researchNotesText = document.getElementById('research-notes-text');
  const btnSaveResearch = document.getElementById('btn-save-research');
  const btnClearResearch = document.getElementById('btn-clear-research');
  const savedLogsContainer = document.getElementById('saved-logs-container');
  const savedCountBadge = document.getElementById('saved-count');
  const btnCopyReport = document.getElementById('btn-copy-report');
  const btnPrintReport = document.getElementById('btn-print-report');
  const btnShowResearchGuide = document.getElementById('btn-show-research-guide');

  // モーダル関連
  const modalStationDetail = document.getElementById('modal-station-detail');
  const modalStationName = document.getElementById('modal-station-name');
  const modalStationCode = document.getElementById('modal-station-code');
  const modalStationContent = document.getElementById('modal-station-content');
  const btnCloseModal = document.getElementById('btn-close-modal');

  const modalResearchGuide = document.getElementById('modal-research-guide');
  const btnCloseGuide = document.getElementById('btn-close-guide');

  let activeStationForModal = null;

  // ========================================================
  // 初期化
  // ========================================================
  init();

  function init() {
    setupTabNavigation();
    setupGpsListeners();
    setupSimulatorListeners();
    renderStationsList();
    setupStationFiltersAndSearch();
    setupResearchSection();
    setupModals();
  }

  // ========================================================
  // タブナビゲーション
  // ========================================================
  function setupTabNavigation() {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const activePanel = document.getElementById(targetTab);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  }

  // ========================================================
  // GPS & 位置情報計算
  // ========================================================
  function setupGpsListeners() {
    btnGetGps.addEventListener('click', () => {
      if (!navigator.geolocation) {
        showGpsStatus('お使いの端末・ブラウザはGPSに対応していません。シミュレーターをご利用ください。', false);
        return;
      }

      showGpsStatus('GPS衛星を探しています... 現在地を取得中', true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          state.currentLat = position.coords.latitude;
          state.currentLng = position.coords.longitude;
          state.currentLocationName = 'あなたの現在地';
          const accuracy = Math.round(position.coords.accuracy);
          showGpsStatus(`現在地を取得しました！（精度: 約±${accuracy}m）`, false, true);
          calculateAndDisplayNearest();
        },
        (error) => {
          let errorMsg = '位置情報を取得できませんでした。';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMsg = '位置情報の利用が許可されていません。設定で許可するか下のシミュレーターをご利用ください。';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg = '位置情報を検出できませんでした。屋外でお試しいただくかシミュレーターをお使いください。';
              break;
            case error.TIMEOUT:
              errorMsg = '位置情報の取得がタイムアウトしました。電波の良い場所でお試しください。';
              break;
          }
          showGpsStatus(errorMsg, false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  function showGpsStatus(message, isLoading, isSuccess = false) {
    gpsStatusBar.classList.remove('hidden');
    gpsStatusText.textContent = message;
    const indicator = gpsStatusBar.querySelector('.status-indicator');
    if (isLoading) {
      indicator.style.background = 'var(--accent-amber)';
      indicator.style.animation = 'pulse 1s infinite';
    } else if (isSuccess) {
      indicator.style.background = 'var(--accent-green)';
      indicator.style.animation = 'none';
    } else {
      indicator.style.background = '#ef4444';
      indicator.style.animation = 'none';
    }
  }

  // テスト用シミュレーターボタン
  function setupSimulatorListeners() {
    simButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lat = parseFloat(btn.getAttribute('data-lat'));
        const lng = parseFloat(btn.getAttribute('data-lng'));
        const name = btn.getAttribute('data-name');

        state.currentLat = lat;
        state.currentLng = lng;
        state.currentLocationName = name;

        showGpsStatus(`【テストシミュレーション】${name} を現在地に設定しました`, false, true);
        calculateAndDisplayNearest();
      });
    });
  }

  // ハバーサインの公式（2点間の距離をメートル単位で計算）
  function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // 地球の半径（m）
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  }

  // 最寄りエレベーターの計算とレンダリング
  function calculateAndDisplayNearest() {
    if (!state.currentLat || !state.currentLng) return;

    // 全駅の全エレベーターをフラットな配列にして距離計算
    const allElevatorsWithDist = [];

    STATIONS_DATA.forEach(station => {
      station.elevators.forEach(ev => {
        const dist = calculateDistanceMeters(state.currentLat, state.currentLng, ev.lat, ev.lng);
        allElevatorsWithDist.push({
          station: station,
          elevator: ev,
          distanceMeters: dist,
          walkMinutes: Math.max(1, Math.round(dist / 75)) // 分速75m換算（ベビーカー等想定）
        });
      });
    });

    // 距離が近い順にソート
    allElevatorsWithDist.sort((a, b) => a.distanceMeters - b.distanceMeters);

    if (allElevatorsWithDist.length === 0) return;

    const nearest = allElevatorsWithDist[0];
    activeStationForModal = nearest.station;

    // 表示反映
    navEmptyState.classList.add('hidden');
    nearestContainer.classList.remove('hidden');

    nearestStationName.textContent = `${nearest.station.name}駅 (${nearest.station.code})`;
    nearestEvTitle.textContent = nearest.elevator.name;
    nearestEvFloor.textContent = nearest.elevator.floor;
    nearestEvAddress.textContent = `📍 ${nearest.elevator.addressDescription}`;
    nearestEvDistance.textContent = nearest.distanceMeters >= 1000
      ? (nearest.distanceMeters / 1000).toFixed(1) + 'k'
      : nearest.distanceMeters;
    nearestEvWalk.textContent = `徒歩 約${nearest.walkMinutes}分`;

    // バリアフリー特徴バッジ
    nearestFeatures.innerHTML = nearest.elevator.features.map(f => `
      <span class="feature-tag">✓ ${f}</span>
    `).join('');

    // 行き方ステップガイド
    nearestRouteSteps.innerHTML = nearest.elevator.routeSteps.map((step, idx) => `
      <li><strong>ステップ ${idx + 1}:</strong> ${step}</li>
    `).join('');

    // Googleマップリンクの更新
    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${state.currentLat},${state.currentLng}&destination=${nearest.elevator.lat},${nearest.elevator.lng}&travelmode=walking`;
    btnOpenMap.href = mapUrl;

    btnViewStationDetail.onclick = () => {
      openStationDetailModal(nearest.station);
    };

    // 周辺の他のエレベーター候補（2番目〜4番目）
    const others = allElevatorsWithDist.slice(1, 4);
    otherNearestList.innerHTML = others.map(item => `
      <div class="other-ev-card" data-station-id="${item.station.id}">
        <div>
          <div class="other-ev-title">${item.station.name}駅 : ${item.elevator.name}</div>
          <div class="other-ev-sub">${item.elevator.floor}</div>
        </div>
        <div class="other-ev-dist">
          約${item.distanceMeters >= 1000 ? (item.distanceMeters/1000).toFixed(1) + 'km' : item.distanceMeters + 'm'}<br>
          <small style="color:var(--text-muted);font-weight:normal;">徒歩約${item.walkMinutes}分</small>
        </div>
      </div>
    `).join('');

    // 他候補クリック時モーダル
    otherNearestList.querySelectorAll('.other-ev-card').forEach(card => {
      card.addEventListener('click', () => {
        const stId = card.getAttribute('data-station-id');
        const st = STATIONS_DATA.find(s => s.id === stId);
        if (st) openStationDetailModal(st);
      });
    });

    // スムーズスクロールで結果へ移動
    nearestContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ========================================================
  // 駅一覧＆検索・フィルター
  // ========================================================
  function renderStationsList() {
    const filtered = STATIONS_DATA.filter(station => {
      // 路線フィルター
      if (state.selectedLineFilter !== 'all') {
        if (!station.lines.includes(state.selectedLineFilter)) return false;
      }
      // 検索フィルター
      if (state.searchQuery.trim() !== '') {
        const q = state.searchQuery.toLowerCase();
        const matchName = station.name.toLowerCase().includes(q);
        const matchKana = station.kana.toLowerCase().includes(q);
        const matchCode = station.code.toLowerCase().includes(q);
        if (!matchName && !matchKana && !matchCode) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      stationsListContainer.innerHTML = `
        <div class="empty-state-box" style="grid-column: 1 / -1;">
          <p class="empty-state-text">該当する駅が見つかりませんでした。「${state.searchQuery}」のキーワードを変えてお試しください。</p>
        </div>
      `;
      return;
    }

    stationsListContainer.innerHTML = filtered.map(station => {
      const lineBadges = station.lines.map(lineKey => {
        const line = TOKYU_LINES[lineKey];
        return `<span class="badge ${lineKey === 'toyoko' ? 'badge-toyoko' : 'badge-oimachi'}">${line.shortName}</span>`;
      }).join(' ');

      const evTags = station.elevators.map(ev => `
        <span class="ev-mini-tag">🛗 ${ev.name}</span>
      `).join('');

      return `
        <div class="station-card" data-station-id="${station.id}">
          <div class="station-card-header">
            <div>
              <span class="station-code-badge">${station.code}</span>
              <div class="station-name-row">
                <h3 class="station-card-title">${station.name}</h3>
                <span class="station-card-kana">${station.kana}</span>
              </div>
            </div>
            <div>${lineBadges}</div>
          </div>
          <div class="station-structure-badge">🏛️ ${station.structure}</div>
          <p class="station-summary">${station.summary}</p>
          <div class="station-ev-preview">
            <div class="ev-preview-count">エレベーター設置箇所（${station.elevators.length}か所）</div>
            <div class="ev-tags-wrap">${evTags}</div>
          </div>
          <button class="btn btn-station-open" type="button" data-station-id="${station.id}">
            構内図・エレベーター詳細を見る ➔
          </button>
        </div>
      `;
    }).join('');

    // カードクリックでモーダル
    stationsListContainer.querySelectorAll('.btn-station-open').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sId = btn.getAttribute('data-station-id');
        const st = STATIONS_DATA.find(s => s.id === sId);
        if (st) openStationDetailModal(st);
      });
    });

    stationsListContainer.querySelectorAll('.station-card').forEach(card => {
      card.addEventListener('click', () => {
        const sId = card.getAttribute('data-station-id');
        const st = STATIONS_DATA.find(s => s.id === sId);
        if (st) openStationDetailModal(st);
      });
    });
  }

  function setupStationFiltersAndSearch() {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.selectedLineFilter = chip.getAttribute('data-line-filter');
        renderStationsList();
      });
    });

    stationSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderStationsList();
    });
  }

  // ========================================================
  // 駅詳細モーダル
  // ========================================================
  function openStationDetailModal(station) {
    modalStationName.textContent = `${station.name}駅`;
    modalStationCode.textContent = station.code;

    const elevatorsHtml = station.elevators.map((ev, index) => {
      const featuresHtml = ev.features.map(f => `<span class="feature-tag">✓ ${f}</span>`).join(' ');
      const stepsHtml = ev.routeSteps.map((step, idx) => `<li>${step}</li>`).join('');

      return `
        <div style="background:rgba(15, 23, 42, 0.6);border:1px solid var(--border-glass);border-radius:16px;padding:16px;margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
            <div style="font-size:0.75rem;color:var(--accent-cyan);font-weight:700;">${ev.floor}</div>
            <span style="font-size:0.75rem;color:var(--text-dim);">#${index + 1}</span>
          </div>
          <h4 style="font-size:1.05rem;color:#fff;font-weight:800;margin-bottom:4px;">${ev.name}</h4>
          <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:10px;">📍 ${ev.addressDescription}</p>
          <div style="margin-bottom:12px;display:flex;flex-wrap:wrap;gap:4px;">${featuresHtml}</div>
          <div style="background:rgba(0,0,0,0.25);border-radius:10px;padding:12px;font-size:0.8rem;line-height:1.5;">
            <strong style="color:#fff;">🚶 スムーズなルート：</strong>
            <ol style="padding-left:18px;margin-top:6px;color:#cbd5e1;">${stepsHtml}</ol>
          </div>
        </div>
      `;
    }).join('');

    modalStationContent.innerHTML = `
      <div style="margin-bottom:18px;">
        <div class="station-structure-badge" style="margin-bottom:8px;">🏛️ ${station.structure}</div>
        <p style="font-size:0.85rem;color:#cbd5e1;line-height:1.6;">${station.summary}</p>
      </div>

      <div style="background:rgba(243, 151, 0, 0.12);border:1px solid rgba(243, 151, 0, 0.3);border-radius:14px;padding:14px;margin-bottom:20px;">
        <h5 style="color:#fbbf24;font-size:0.85rem;font-weight:800;margin-bottom:4px;">💡 自由研究の現地調査ポイント</h5>
        <p style="font-size:0.8rem;color:#fde68a;line-height:1.5;">${station.researchNotes}</p>
      </div>

      <h4 style="font-size:0.95rem;font-weight:800;color:#fff;margin-bottom:12px;">🛗 エレベーター一覧（${station.elevators.length}か所）</h4>
      ${elevatorsHtml}
    `;

    modalStationDetail.classList.remove('hidden');
  }

  function setupModals() {
    btnCloseModal.addEventListener('click', () => {
      modalStationDetail.classList.add('hidden');
    });

    modalStationDetail.addEventListener('click', (e) => {
      if (e.target === modalStationDetail) {
        modalStationDetail.classList.add('hidden');
      }
    });

    // 自由研究ガイドモーダル
    btnShowResearchGuide.addEventListener('click', () => {
      modalResearchGuide.classList.remove('hidden');
    });

    btnCloseGuide.addEventListener('click', () => {
      modalResearchGuide.classList.add('hidden');
    });

    modalResearchGuide.addEventListener('click', (e) => {
      if (e.target === modalResearchGuide) {
        modalResearchGuide.classList.add('hidden');
      }
    });
  }

  // ========================================================
  // 夏休みの自由研究ノート機能
  // ========================================================
  function setupResearchSection() {
    // 駅セレクトの初期化
    researchStationSelect.innerHTML = STATIONS_DATA.map(st => `
      <option value="${st.id}">${st.name}駅 (${st.lines.map(l => TOKYU_LINES[l].shortName).join('・')})</option>
    `).join('');

    researchStationSelect.addEventListener('change', () => {
      updateResearchElevatorSelect();
    });

    // エレベーターセレクトの更新
    updateResearchElevatorSelect();

    // チェックリストのレンダリング
    researchChecklistContainer.innerHTML = RESEARCH_CHECKLIST_TEMPLATE.map(item => `
      <label class="check-item" for="${item.id}">
        <input type="checkbox" id="${item.id}" data-item-id="${item.id}" data-item-label="${item.label}">
        <span class="check-label">${item.label}</span>
      </label>
    `).join('');

    // 保存ボタン
    btnSaveResearch.addEventListener('click', () => {
      saveResearchLog();
    });

    // リセットボタン
    btnClearResearch.addEventListener('click', () => {
      clearResearchForm();
    });

    // コピーボタン
    btnCopyReport.addEventListener('click', () => {
      copyReportText();
    });

    // 印刷ボタン
    btnPrintReport.addEventListener('click', () => {
      window.print();
    });

    renderSavedLogs();
  }

  function updateResearchElevatorSelect() {
    const sId = researchStationSelect.value;
    const station = STATIONS_DATA.find(s => s.id === sId);
    if (!station) return;

    researchElevatorSelect.innerHTML = station.elevators.map(ev => `
      <option value="${ev.id}">${ev.name}（${ev.floor}）</option>
    `).join('');
  }

  function saveResearchLog() {
    const sId = researchStationSelect.value;
    const evId = researchElevatorSelect.value;
    const station = STATIONS_DATA.find(s => s.id === sId);
    const elevator = station ? station.elevators.find(e => e.id === evId) : null;

    if (!station || !elevator) return;

    // チェックされた項目
    const checkedItems = [];
    RESEARCH_CHECKLIST_TEMPLATE.forEach(template => {
      const checkbox = document.getElementById(template.id);
      if (checkbox && checkbox.checked) {
        checkedItems.push(template.label);
      }
    });

    const notes = researchNotesText.value.trim();

    if (checkedItems.length === 0 && notes === '') {
      alert('チェック項目を選ぶか、メモを入力してから保存してください！');
      return;
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newLog = {
      id: 'log_' + Date.now(),
      stationId: station.id,
      stationName: station.name,
      stationCode: station.code,
      elevatorId: elevator.id,
      elevatorName: elevator.name,
      checkedItems: checkedItems,
      notes: notes,
      timestamp: dateStr
    };

    state.savedResearchLogs.unshift(newLog);
    localStorage.setItem('tokyu_elevator_research_logs', JSON.stringify(state.savedResearchLogs));

    clearResearchForm();
    renderSavedLogs();

    // 成功トースト演出
    const status = document.getElementById('save-status');
    status.textContent = '保存しました！🎉';
    status.style.color = '#10b981';
    setTimeout(() => {
      status.textContent = '自動保存中';
      status.style.color = 'var(--accent-green)';
    }, 2500);
  }

  function clearResearchForm() {
    RESEARCH_CHECKLIST_TEMPLATE.forEach(template => {
      const checkbox = document.getElementById(template.id);
      if (checkbox) checkbox.checked = false;
    });
    researchNotesText.value = '';
  }

  function renderSavedLogs() {
    savedCountBadge.textContent = state.savedResearchLogs.length;

    if (state.savedResearchLogs.length === 0) {
      savedLogsContainer.innerHTML = `
        <div class="empty-state-box">
          <p class="empty-state-text">まだ調査記録がありません。駅でエレベーターを調査したら、上のフォームからメモを記録してみましょう！</p>
        </div>
      `;
      return;
    }

    savedLogsContainer.innerHTML = state.savedResearchLogs.map(log => {
      const tagsHtml = log.checkedItems.map(item => `
        <span class="log-tag-checked">✓ ${item}</span>
      `).join('');

      return `
        <div class="log-card">
          <div class="log-header">
            <div>
              <div class="log-station">${log.stationName}駅 <small style="color:var(--text-dim);">${log.stationCode}</small></div>
              <div class="log-ev-name">🛗 ${log.elevatorName}</div>
            </div>
            <div style="text-align:right;">
              <span class="log-date">${log.timestamp}</span><br>
              <button class="btn-delete-log" data-log-id="${log.id}">🗑️ 削除</button>
            </div>
          </div>
          ${tagsHtml ? `<div class="log-checklist-results">${tagsHtml}</div>` : ''}
          ${log.notes ? `<div class="log-notes">${log.notes}</div>` : ''}
        </div>
      `;
    }).join('');

    savedLogsContainer.querySelectorAll('.btn-delete-log').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-log-id');
        if (confirm('この調査記録を削除しますか？')) {
          state.savedResearchLogs = state.savedResearchLogs.filter(l => l.id !== id);
          localStorage.setItem('tokyu_elevator_research_logs', JSON.stringify(state.savedResearchLogs));
          renderSavedLogs();
        }
      });
    });
  }

  // 模造紙・レポート用のテキスト生成＆クリップボードコピー
  function copyReportText() {
    if (state.savedResearchLogs.length === 0) {
      alert('コピーできる調査データがありません。先に調査を記録してください。');
      return;
    }

    let report = `========================================\n`;
    report += `【自由研究まとめ】東急線 駅エレベーター現地調査レポート\n`;
    report += `テーマ：誰にとってもやさしい駅エレベーターの工夫と秘密\n`;
    report += `調査路線：東急東横線・東急大井町線\n`;
    report += `調査記録数：${state.savedResearchLogs.length}件\n`;
    report += `========================================\n\n`;

    state.savedResearchLogs.forEach((log, idx) => {
      report += `【調査 ${idx + 1}】${log.stationName}駅 (${log.stationCode})\n`;
      report += `・エレベーター：${log.elevatorName}\n`;
      report += `・調査日時：${log.timestamp}\n`;
      if (log.checkedItems.length > 0) {
        report += `・確認できた工夫（チェック項目）：\n`;
        log.checkedItems.forEach(item => {
          report += `  - ${item}\n`;
        });
      }
      if (log.notes) {
        report += `・気づいたこと・メモ：\n  ${log.notes}\n`;
      }
      report += `----------------------------------------\n\n`;
    });

    report += `【まとめ・考察】\n`;
    report += `・駅によってホームが地上、地下、高架と異なり、エレベーターの配置や地上出口までのアプローチに様々な工夫があった。\n`;
    report += `・ベビーカーや車椅子を利用する人にとって、どの改札・出口を使うべきかが非常に重要であることが分かった。\n`;

    navigator.clipboard.writeText(report).then(() => {
      alert('自由研究レポート用テキストをクリップボードにコピーしました！\nWordやGoogleドキュメント、プリントに貼り付けて使えます。');
    }).catch(() => {
      prompt('下のテキストをコピーしてください：', report);
    });
  }
});
