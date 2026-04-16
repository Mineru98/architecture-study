import { useState } from 'react';
import { useSimulatorStore } from '../../shared/store/simulatorStore';
import { abacApi } from '../../shared/api/abacApi';
import type { Policy } from '../../shared/types/abc';

interface Props {
  policies: Policy[];
}

export function PolicySimulator({ policies: _policies }: Props) {
  const {
    subject,
    resource,
    action,
    environment,
    result,
    isLoading,
    setSubject,
    setResource,
    setAction,
    setEnvironment,
    setResult,
    setIsLoading,
    setError,
  } = useSimulatorStore();

  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async () => {
    setShowResult(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await abacApi.accessCheck({
        subject,
        resource,
        action,
        environment: {},
      });
      setResult(response.data);
    } catch (err) {
      setError('접근 평가 중 오류가 발생했습니다.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Policy Simulator</h2>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Subject (주체)</h3>
        <div style={styles.grid}>
          <label style={styles.label}>
            User ID
            <input
              type="text"
              value={subject.userId}
              onChange={(e) => setSubject({ userId: e.target.value })}
              style={styles.input}
              placeholder="user-001"
            />
          </label>
          <label style={styles.label}>
            Role
            <select
              value={subject.role}
              onChange={(e) =>
                setSubject({ role: e.target.value as typeof subject.role })
              }
              style={styles.select}
            >
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
              <option value="user">User</option>
            </select>
          </label>
          <label style={styles.label}>
            Trust Level (1-5)
            <input
              type="number"
              min={1}
              max={5}
              value={subject.trustLevel}
              onChange={(e) =>
                setSubject({ trustLevel: parseInt(e.target.value) || 1 })
              }
              style={styles.input}
            />
          </label>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Resource (자원)</h3>
        <div style={styles.grid}>
          <label style={styles.label}>
            Type
            <select
              value={resource.type}
              onChange={(e) =>
                setResource({ type: e.target.value as typeof resource.type })
              }
              style={styles.select}
            >
              <option value="product">Product</option>
              <option value="refund">Refund</option>
              <option value="user">User</option>
            </select>
          </label>
          <label style={styles.label}>
            ID
            <input
              type="text"
              value={resource.id}
              onChange={(e) => setResource({ id: e.target.value })}
              style={styles.input}
              placeholder="resource-001"
            />
          </label>
          <label style={styles.label}>
            Owner ID
            <input
              type="text"
              value={resource.ownerId}
              onChange={(e) => setResource({ ownerId: e.target.value })}
              style={styles.input}
              placeholder="owner-001"
            />
          </label>
          <label style={styles.label}>
            Amount
            <input
              type="number"
              value={resource.amount || 0}
              onChange={(e) =>
                setResource({ amount: parseInt(e.target.value) || 0 })
              }
              style={styles.input}
              placeholder="100000"
            />
          </label>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Action (액션)</h3>
        <div style={styles.grid}>
          <label style={styles.label}>
            Type
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              style={styles.select}
            >
              <option value="read">Read</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
            </select>
          </label>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Environment (환경)</h3>
        <div style={styles.grid}>
          <label style={styles.label}>
            Hour (0-23)
            <input
              type="number"
              min={0}
              max={23}
              value={environment.hour}
              onChange={(e) =>
                setEnvironment({ hour: parseInt(e.target.value) || 0 })
              }
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Trusted Network
            <input
              type="checkbox"
              checked={environment.trustedNetwork}
              onChange={(e) =>
                setEnvironment({ trustedNetwork: e.target.checked })
              }
              style={styles.checkbox}
            />
          </label>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          ...styles.button,
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading ? '평가 중...' : '평가하기'}
      </button>

      {showResult && result && (
        <div
          style={{
            ...styles.resultBox,
            backgroundColor:
              result.decision === 'allow' ? '#22C55E' : '#EF4444',
          }}
        >
          <div style={styles.resultDecision}>{result.decision.toUpperCase()}</div>
          <div style={styles.resultReason}>{result.reason}</div>
          {result.matchedPolicy && (
            <div style={styles.resultPolicy}>
              매칭된 정책: {result.matchedPolicy.name} (우선순위:{' '}
              {result.matchedPolicy.priority})
            </div>
          )}
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
  title: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '20px',
    color: '#111827',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '12px',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '13px',
    color: '#6B7280',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#ffffff',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#3B82F6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  resultBox: {
    marginTop: '20px',
    padding: '16px',
    borderRadius: '8px',
    color: '#ffffff',
  },
  resultDecision: {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '8px',
  },
  resultReason: {
    fontSize: '14px',
    opacity: 0.9,
  },
  resultPolicy: {
    fontSize: '13px',
    marginTop: '8px',
    opacity: 0.8,
  },
};