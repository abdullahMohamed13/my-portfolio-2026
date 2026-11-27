import KineticNavigation from '@/components/ui/sterling-gate-kinetic-navigation';

export default function NavBar() {
  return (
    <>
      <KineticNavigation />
      <p
        style={{
          position: 'fixed',
          bottom: '12px',
          left: '12px',
          zIndex: 50,
          margin: 0,
          padding: '4px 10px',
          borderRadius: '999px',
          background: '#fdbd04',
          color: '#1a1a1a',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '0.08em',
          pointerEvents: 'none',
        }}
      >
        (NOT FINISHED YET)
      </p>
    </>
  );
}
