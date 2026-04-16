import { useState, useEffect } from 'react';
import { PolicySimulator } from '../../features/PolicySimulator';
import { PolicyList } from '../../features/PolicyList';
import { AccessDecisionLog } from '../../features/AccessDecisionLog';
import { AttributeInspector } from '../../features/AttributeInspector';
import { abacApi } from '../../shared/api/abacApi';
import { useSimulatorStore } from '../../shared/store/simulatorStore';
import type { Policy, AuditLogItem } from '../../shared/types/abc';

type ViewKey = 'simulator' | 'policy' | 'log' | 'attribute';

export function AbacDashboard() {
  const [activeView, setActiveView] = useState<ViewKey>('simulator');
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { setAuditLogs: setStoreAuditLogs } = useSimulatorStore();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [policiesRes, auditRes] = await Promise.all([
        abacApi.getPolicies(),
        abacApi.getAuditLog(),
      ]);
      setPolicies(policiesRes.data);
      setAuditLogs(auditRes.data);
      setStoreAuditLogs(auditRes.data);
    } catch {
      // API가 아직 준비되지 않은 경우 무시
    }
  };

  const handleRefreshLogs = () => {
    loadData();
  };

  const views: { key: ViewKey; label: string }[] = [
    { key: 'simulator', label: '시뮬레이터' },
    { key: 'policy', label: '정책 목록' },
    { key: 'log', label: '평가 이력' },
    { key: 'attribute', label: '속성 분해' },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'simulator':
        return <PolicySimulator policies={policies} />;
      case 'policy':
        return <PolicyList policies={policies} />;
      case 'log':
        return <AccessDecisionLog logs={auditLogs} onRefresh={handleRefreshLogs} />;
      case 'attribute':
        return <AttributeInspector />;
      default:
        return <PolicySimulator policies={policies} />;
    }
  };

  return (
    <div style={styles.layout}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={styles.menuButton}
          >
            ☰
          </button>
          <h1 style={styles.title}>ABAC 접근 제어</h1>
        </div>
      </header>

      <div style={styles.body}>
        {/* Sidebar */}
        <aside
          style={{
            ...styles.sidebar,
            width: isSidebarOpen ? '200px' : '0px',
            overflow: isSidebarOpen ? 'visible' : 'hidden',
          }}
        >
          <nav style={styles.nav}>
            {views.map((view) => (
              <button
                key={view.key}
                onClick={() => setActiveView(view.key)}
                style={{
                  ...styles.navItem,
                  ...(activeView === view.key ? styles.activeNavItem : {}),
                }}
              >
                {view.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main style={styles.main}>{renderContent()}</main>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #E5E7EB',
    padding: '0 20px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    color: '#374151',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  body: {
    display: 'flex',
    flex: 1,
  },
  sidebar: {
    backgroundColor: '#ffffff',
    borderRight: '1px solid #E5E7EB',
    transition: 'width 0.2s',
    flexShrink: 0,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 0',
  },
  navItem: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: 500,
    color: '#6B7280',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  activeNavItem: {
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    borderLeft: '3px solid #3B82F6',
  },
  main: {
    flex: 1,
    padding: '20px',
    overflow: 'auto',
  },
};