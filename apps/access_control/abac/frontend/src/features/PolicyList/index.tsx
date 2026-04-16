import type { Policy } from '../../shared/types/abc';

interface Props {
  policies: Policy[];
}

export function PolicyList({ policies }: Props) {
  if (!policies || policies.length === 0) {
    return (
      <div style={styles.empty}>
        <p>정책이 없습니다.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Policy List</h2>
      <p style={styles.description}>등록된 시드 정책 목록입니다.</p>

      <div style={styles.grid}>
        {policies.map((policy) => (
          <div
            key={policy.id}
            style={{
              ...styles.card,
              borderLeftColor:
                policy.effect === 'allow' ? '#22C55E' : '#EF4444',
            }}
          >
            <div style={styles.cardHeader}>
              <span style={styles.policyName}>{policy.name}</span>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor:
                    policy.effect === 'allow' ? '#22C55E' : '#EF4444',
                }}
              >
                {policy.effect.toUpperCase()}
              </span>
            </div>

            <div style={styles.cardBody}>
              <div style={styles.info}>
                <span style={styles.label}>우선순위</span>
                <span style={styles.value}>{policy.priority}</span>
              </div>

              <div style={styles.conditions}>
                <span style={styles.conditionsLabel}>조건</span>
                <ul style={styles.conditionsList}>
                  {policy.conditions.map((condition, index) => (
                    <li key={index} style={styles.conditionItem}>
                      <code style={styles.conditionCode}>
                        {condition.attribute}{' '}
                        {condition.operator}{' '}
                        {JSON.stringify(condition.value)}
                      </code>
                    </li>
                  ))}
                </ul>
              </div>

              {policy.description && (
                <p style={styles.descriptionText}>{policy.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
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
  title: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#111827',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
  card: {
    borderRadius: '8px',
    borderLeft: '4px solid',
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#F3F4F6',
    borderBottom: '1px solid #E5E7EB',
  },
  policyName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
  },
  badge: {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#ffffff',
  },
  cardBody: {
    padding: '12px 16px',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  label: {
    fontSize: '12px',
    color: '#6B7280',
  },
  value: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
  },
  conditions: {
    marginTop: '8px',
  },
  conditionsLabel: {
    fontSize: '12px',
    color: '#6B7280',
    display: 'block',
    marginBottom: '4px',
  },
  conditionsList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  conditionItem: {
    marginBottom: '4px',
  },
  conditionCode: {
    fontSize: '12px',
    fontFamily: 'monospace',
    backgroundColor: '#E5E7EB',
    padding: '2px 6px',
    borderRadius: '4px',
    color: '#374151',
  },
  descriptionText: {
    fontSize: '12px',
    color: '#6B7280',
    marginTop: '8px',
    fontStyle: 'italic',
  },
};