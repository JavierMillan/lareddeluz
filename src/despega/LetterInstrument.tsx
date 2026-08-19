type Props = { id: string; glyph: string; active: boolean };

/**
 * El telon de la escena: la letra como atmosfera.
 *
 * Sin ejes cruzados — una cruz sobre el glifo se lee como rayon, no como
 * instrumento. Queda una sola orbita abierta que pasa por detras y tres
 * marcas de posicion, todo muy por debajo del contraste del texto.
 */
export function LetterInstrument({ id, glyph, active }: Props) {
  return (
    <svg className="letter-instrument" data-testid="letter-instrument" data-letter={id} data-active={active} viewBox="0 0 240 240" aria-hidden="true">
      <defs><radialGradient id={`glow-${id}`}><stop stopColor="currentColor" stopOpacity=".3"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></radialGradient></defs>
      <circle cx="120" cy="120" r="105" fill={`url(#glow-${id})`} />
      <path className="letter-instrument__orbit" d="M25 126C49 47 174 26 218 100S175 217 87 205 9 170 25 126Z" pathLength="1" />
      <text x="120" y="163" textAnchor="middle">{glyph}</text>
      <circle cx="29" cy="118" r="3"/><circle cx="198" cy="70" r="2"/><circle cx="170" cy="205" r="2.5"/>
    </svg>
  );
}
