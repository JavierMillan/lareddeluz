type Props = { id: string; glyph: string; active: boolean };

/**
 * El telon de la escena: la letra como atmosfera viva.
 *
 * El glifo se dibuja dos veces — un relleno de cobre en degradado y un
 * contorno encima — para que tenga cuerpo y no solo silueta. La orbita se
 * traza sola al entrar el capitulo y un satelite la recorre.
 */
export function LetterInstrument({ id, glyph, active }: Props) {
  const orbit = "M25 126C49 47 174 26 218 100S175 217 87 205 9 170 25 126Z";
  return (
    <svg className="letter-instrument" data-testid="letter-instrument" data-letter={id} data-active={active} viewBox="0 0 240 240" aria-hidden="true">
      <defs>
        <radialGradient id={`glow-${id}`}><stop stopColor="currentColor" stopOpacity=".3"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></radialGradient>
        <linearGradient id={`metal-${id}`} x1="0" y1="0" x2=".35" y2="1">
          <stop offset="0" stopColor="#f6d3a6" stopOpacity=".5"/>
          <stop offset=".45" stopColor="#d4823f" stopOpacity=".26"/>
          <stop offset="1" stopColor="#8f532e" stopOpacity=".1"/>
        </linearGradient>
        <path id={`orbit-${id}`} d={orbit} />
      </defs>
      <circle cx="120" cy="120" r="105" fill={`url(#glow-${id})`} />
      <path className="letter-instrument__orbit" d={orbit} pathLength="1" />
      <text className="letter-instrument__fill" x="120" y="163" textAnchor="middle" fill={`url(#metal-${id})`}>{glyph}</text>
      <text className="letter-instrument__edge" x="120" y="163" textAnchor="middle">{glyph}</text>
      <circle className="letter-instrument__mark" cx="29" cy="118" r="3"/>
      <circle className="letter-instrument__mark" cx="198" cy="70" r="2"/>
      <circle className="letter-instrument__mark" cx="170" cy="205" r="2.5"/>
      <circle className="letter-instrument__sat" r="2.4">
        <animateMotion dur="26s" repeatCount="indefinite" rotate="auto"><mpath href={`#orbit-${id}`} /></animateMotion>
      </circle>
    </svg>
  );
}
