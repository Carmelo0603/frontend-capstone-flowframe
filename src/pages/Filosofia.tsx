export function Filosofia() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 text-neutral-900 font-sans p-8">
      <div className="max-w-3xl w-full bg-white border border-neutral-200 shadow-sm p-12">
        <div className="border-b-2 border-neutral-900 pb-6 mb-8">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Logic First, Pixel Second</h1>
          <p className="text-sm font-mono text-neutral-500 tracking-widest uppercase">Il Manifesto di FlowFrame</p>
        </div>

        <div className="space-y-8 text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-black uppercase text-neutral-900 mb-3">La deriva del "Bello ma Inutile"</h2>
            <p className="text-sm">
              L'avvento dell'IA generativa ha inondato il design digitale di interfacce visivamente spettacolari, ma spesso prive di una solida architettura
              logica. Strumenti che generano layout completi con un click rischiano di trasformare il designer in un passivo correttore di algoritmi "black
              box", allontanandolo dalla comprensione dei reali bisogni dell'utente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black uppercase text-neutral-900 mb-3">L'IA come assistente, non come sostituto</h2>
            <p className="text-sm">
              FLOWFRAME inverte questo paradigma. Riposizioniamo l'Intelligenza Artificiale come un assistente esecutivo rigoroso. L'IA non progetta al tuo
              posto: si limita a tradurre le tue intenzioni logiche e strutturali in wireframe funzionali. Il designer mantiene il controllo totale e il ruolo
              di orchestratore di sistemi complessi.
            </p>
          </section>

          <section className="bg-neutral-50 p-6 border border-neutral-200 mt-8">
            <h2 className="text-lg font-black uppercase text-neutral-900 mb-4">I Tre Pilastri</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="font-black text-neutral-900">01.</span>
                <div>
                  <strong className="block uppercase tracking-wider text-xs mb-1">Struttura prima della decorazione</strong>
                  Niente colori, niente immagini placeholder fuorvianti. Solo blueprint strutturali in bianco e nero per ristabilire la supremazia
                  dell'architettura dell'informazione.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-neutral-900">02.</span>
                <div>
                  <strong className="block uppercase tracking-wider text-xs mb-1">Glass Box (Trasparenza Totale)</strong>
                  Ogni intervento del sistema è visibile, tracciabile e reversibile. Nessuna magia algoritmica nascosta; solo blocchi logici che rispondono a
                  comandi precisi.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-neutral-900">03.</span>
                <div>
                  <strong className="block uppercase tracking-wider text-xs mb-1">Human-in-the-Loop</strong>
                  L'IA propone, il progettista dispone. L'essere umano resta al centro del processo decisionale, garantendo l'etica, l'usabilità e la direzione
                  strategica del progetto.
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
