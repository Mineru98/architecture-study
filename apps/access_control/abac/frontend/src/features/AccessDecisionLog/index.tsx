import type { AuditLogItem } from '../../shared/types/abc';

interface Props {
  logs: AuditLogItem[];
  onRefresh: () => void;
}

export function AccessDecisionLog({ logs, onRefresh }: Props) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Access Decision Log</h2>
        <button onClick={onRefresh} style={styles.refreshButton}>
          새로고침
        </button>
      </div>
      <p style={styles.description}>최근 접근 평가 이력입니다.</p>

      {!logs || logs.length === 0 ? (
        <div style={styles.empty}>
          <p>평가 이력이 없습니다.</p>
        </div>
      ) : (
        <div style={styles.timeline}>
          {logs.map((log, index) => (
            <div key={log.id || index} style={styles.logItem}>
              <div
                style={{
                  ...styles.dot,
                  backgroundColor:
                    log.decision === 'allow' ? '#22C55E' : '#EF4444',
                }}
              />
              <div style={styles.logContent}>
                <div style={styles.logHeader}>
                  <span style={styles.timestamp}>
                    {new Date(log.timestamp).toLocaleString('ko-KR')}
                  </span>
                  <span
                    style={{
                      ...styles.decisionBadge,
                      backgroundColor:
                        log.decision === 'allow' ? '#22C55E' : '#EF4444',
                    }}
                  >
                    {log.decision.toUpperCase()}
                  </span>
                </div>

                <div style={styles.logDetails}>
                  <span style={styles.userId}>{log.userId}</span>
                  <span style={styles.arrow}>→</span>
                  <span style={styles.action}>
                    {log.action.toUpperCase()}
                  </span>
                  <span style={styles.arrow}>→</span>
                  <span style={styles.resource}>
                    {log.resourceType}:{log.resourceId}
                  </span>
                </div>

                <div style={styles.reason}>{log.reason}</div>

                <div style={styles.meta}>
                  <span>IP: {log.ipAddress}</span>
                  <span>처리시간: {log.processingTimeMs}ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
  },
  refreshButton: {
    padding: '6px 12px',
    backgroundColor: '#F3F4F6',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  description: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '20px',
  },
  empty: {
    padding: '40px',
    textAlign: 'center',
    color: '#6B7280',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  logItem: {
    display: 'flex',
    gap: '16px',
    paddingBottom: '16px',
    marginBottom: '16px',
    borderBottom: '1px solid #E5E7EB',
    position: 'relative',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: '4px',
  },
  logContent: {
    flex: 1,
    minWidth: 0,
  },
  logHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
  },
  timestamp: {
    fontSize: '12px',
    color: '#6B7280',
  },
  decisionBadge: {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#ffffff',
  },
  logDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '6px',
  },
  userId: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
  },
  arrow: {
    color: '#9CA3AF',
    fontSize: '12px',
  },
  action: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#3B82F6',
  },
  resource: {
    fontSize: '13px',
    color: '#374151',
  },
  reason: {
    fontSize: '13px',
    color: '#6B7280',
    marginBottom: '6px',
  },
  meta: {
    display: 'flex',
    gap: '16px',
    fontSize: '12px',
    color: '#9CA3AF',
  },
};