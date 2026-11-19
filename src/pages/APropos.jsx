import config from '../../data/config.json'

export default function APropos() {
  return (
    <section className="section">
      <div className="row">
        <div className="section__head">
          <h2 className="section__title">À propos <span>//</span> le label</h2>
        </div>
        <div className="prose">
          <p>{config.description}</p>
          <div className="doctrine">
            <p>
              <strong>Notre doctrine :</strong> 100 % des royalties nettes de distribution au groupe.
              Le Label retient uniquement 20 % sur les subventions. Distribution via WiseBand.
              Bandcamp en vitrine directe.
            </p>
          </div>
          <p>
            <strong>Christophe</strong> — co-manager, anime Le Label² et la programmation des Belles Journées 2027.
            <br />
            <strong>Roxane</strong> — co-manager, subventions et animation des Belles Journées 2027.
          </p>
          <p>
            Le Label co-organise les <strong>Belles Journées</strong> (du 2 au 6 juin 2027 à Nîmes), dont le Off du TINALS
            avec les collectifs (FEMAG).
          </p>
          <p>
            Édition musicale partenaire : <a href={config.social.kaardinal_publishing} target="_blank" rel="noreferrer"><strong>Kaardinal Publishing</strong></a>.
          </p>
          <p>{config.address}</p>
        </div>
      </div>
    </section>
  )
}
