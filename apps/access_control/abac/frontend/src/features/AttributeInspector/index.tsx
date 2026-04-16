import { useState } from 'react';
import { useSimulatorStore } from '../../shared/store/simulatorStore';

type TabKey = 'subject' | 'resource' | 'action' | 'environment';

export function AttributeInspector() {
  const [activeTab, setActiveTab] = useState<TabKey>('subject');
  const { subject, resource, action, environment } = useSimulatorStore();

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'subject', label: 'Subject' },
    { key: 'resource', label: 'Resource' },
    { key: 'action', label: 'Action' },
    { key: 'environment', label: 'Environment' },
  ];

  const renderAttributeTable = (data: Record<string, unknown>) => (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>속성</th>
          <th style={styles.th}>값</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td style={styles.td}>{key}</td>
            <td style={styles.td}>
              <code style={styles.valueCode}>
                {value === undefined
                  ? 'undefined'
                  : value === null
                    ? 'null'
                    : typeof value === 'boolean'
                      ? value.toString()
                      : String(value)}
              </code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'subject':
        return renderAttributeTable(subject as unknown as Record<string, unknown>);
      case 'resource':
        return renderAttributeTable(resource as unknown as Record<string, unknown>);
      case 'action':
        return renderAttributeTable({ type: action });
      case 'environment':
        return renderAttributeTable(environment as unknown as Record<string, unknown>);
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Attribute Inspector</h2>
      <p style={styles.description}>4속성(SRAE) 분해 뷰어입니다.</p>

      <div style={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...styles.tab,
              ...(activeTab === tab.key ? styles.activeTab : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.content}>{renderContent()}</div>
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
  tabs: {
    display: 'flex',
    gap: '4px',
    borderBottom: '1px solid #E5E7EB',
    marginBottom: '16px',
  },
  tab: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontSize: '14px',
    fontWeight: 500,
    color: '#6B7280',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  activeTab: {
    color: '#3B82F6',
    borderBottomColor: '#3B82F6',
  },
  content: {
    minHeight: '200px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    backgroundColor: '#F9FAFB',
    borderBottom: '1px solid #E5E7EB',
  },
  td: {
    padding: '10px 12px',
    fontSize: '14px',
    color: '#374151',
    borderBottom: '1px solid #E5E7EB',
  },
  valueCode: {
    fontFamily: 'monospace',
    fontSize: '13px',
    backgroundColor: '#F3F4F6',
    padding: '2px 6px',
    borderRadius: '4px',
    color: '#111827',
  },
};