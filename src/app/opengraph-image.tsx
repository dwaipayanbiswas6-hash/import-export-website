import { ImageResponse } from 'next/og';

export const alt =
  'Biswas Exports — Bridging Indian Excellence to Global Markets';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background: '#07182e',
        color: 'white',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        padding: '72px',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          border: '1px solid rgba(203,160,82,.35)',
          borderRadius: 60,
          height: 440,
          position: 'absolute',
          right: -90,
          top: -80,
          width: 440,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 1020,
          width: '100%',
        }}
      >
        <div
          style={{
            color: '#cba052',
            display: 'flex',
            fontSize: 23,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: 'uppercase',
          }}
        >
          Merchant Export Company · India
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 78,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
            marginTop: 28,
          }}
        >
          Biswas Exports
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,.72)',
            display: 'flex',
            fontSize: 37,
            marginTop: 28,
          }}
        >
          Bridging Indian Excellence to Global Markets
        </div>
        <div
          style={{
            color: '#cba052',
            display: 'flex',
            fontSize: 22,
            marginTop: 55,
          }}
        >
          Asansol · West Bengal · India
        </div>
      </div>
    </div>,
    size,
  );
}
