import { useEffect, useState } from 'react';

import { IMatch } from '../types/Match';
import { getPointsMatch, getPointsMatchDiscriminated } from '../utils';

export const Simulator: React.FC = () => {
  const [currentLocalScore, setCurrentLocalScore] = useState<number | null>(null);
  const [currentVisitorScore, setCurrentVisitorScore] = useState<number | null>(null);
  const [predictedLocalScore, setPredictedLocalScore] = useState<number | null>(null);
  const [predictedVisitorScore, setPredictedVisitorScore] = useState<number | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  
  const calculatePoints = () => {
    const match: IMatch = {
      local_team: {
        result: currentLocalScore as number
      },
      visiting_team: {
        result: currentVisitorScore as number
      }
    }
    setPoints(getPointsMatch(match, predictedLocalScore as number, predictedVisitorScore as number));
  }
  const handleScoreChange = (stateSetter: (value: number | null) => void, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? null : parseInt(event.target.value, 10);
    if (newValue === null || (newValue >= 0 && newValue <= 99)) {
      stateSetter(newValue);
    }
  }
  useEffect(() => {
    setPoints(null);
  }, [currentLocalScore, currentVisitorScore, predictedLocalScore, predictedVisitorScore])
  return (
    <section className="simulator">
      <h2>Simulador de Puntuación</h2>
      <div className="score-inputs">
        <div>
          <label>
            Resultado Real
          </label>
          <div className="input-group">
            <input
              type="number"
              value={currentLocalScore ?? ''}
              onChange={(e) => handleScoreChange(setCurrentLocalScore, e)}
            />
            <span>-</span>
            <input
              type="number"
              value={currentVisitorScore ?? ''}
              onChange={(e) => handleScoreChange(setCurrentVisitorScore, e)}
            />
          </div>
        </div>
        <div>
          <label>
              Resultado Predicho
          </label>
          <div className="input-group">
            <input
              type="number"
              value={predictedLocalScore ?? ''}
              onChange={(e) => handleScoreChange(setPredictedLocalScore, e)}
            />
            <span>-</span>
            <input
              type="number"
              value={predictedVisitorScore ?? ''}
              onChange={(e) => handleScoreChange(setPredictedVisitorScore, e)}
            />
          </div>
        </div>
      </div>
      <button
        disabled={currentLocalScore === null || 
          currentVisitorScore === null || 
          predictedLocalScore === null || 
          predictedVisitorScore === null
        }
        onClick={calculatePoints}
      >
        Calcular Puntos
      </button>
      {points !== null && (
        <>
          <p>Puntos Obtenidos</p>
          <label className="point">{points}</label>
          <h3>
            Detalles:
          </h3>
            <ul>
              <li>
                Puntos por acertar el encuentro: <span className="point">
                  {
                    getPointsMatchDiscriminated(
                      {
                        local_team: {result: currentLocalScore as number},
                        visiting_team: {result: currentVisitorScore as number}
                      },
                      predictedLocalScore as number,
                      predictedVisitorScore as number,
                      'matchPoints'
                    )
                  }
                </span>
              </li>
              <li>
                Puntos por acertar el marcador local: <span className="point">
                  {
                    getPointsMatchDiscriminated(
                      {
                        local_team: {result: currentLocalScore as number},
                        visiting_team: {result: currentVisitorScore as number}
                      },
                      predictedLocalScore as number,
                      predictedVisitorScore as number,
                      'localScorePoints'
                    )
                  }
                </span>
              </li>
              <li>
                Puntos por acertar el marcador visitante: <span className="point">
                  {
                    getPointsMatchDiscriminated(
                      {
                        local_team: {result: currentLocalScore as number},
                        visiting_team: {result: currentVisitorScore as number}
                      },
                      predictedLocalScore as number,
                      predictedVisitorScore as number,
                      'visitorScorePoints'
                    )
                  }
                </span>
              </li>
              <li>
                Puntos por acertar el resultado exacto: <span className="point">
                  {
                    getPointsMatchDiscriminated(
                      {
                        local_team: {result: currentLocalScore as number},
                        visiting_team: {result: currentVisitorScore as number}
                      },
                      predictedLocalScore as number,
                      predictedVisitorScore as number,
                      'exactScore'
                    )
                  }
                </span>
              </li>
              <li>
                Puntos bonificación en caso de empate no exacto: <span className="point">
                  {
                    getPointsMatchDiscriminated(
                      {
                        local_team: {result: currentLocalScore as number},
                        visiting_team: {result: currentVisitorScore as number}
                      },
                      predictedLocalScore as number,
                      predictedVisitorScore as number,
                      'addPoints'
                    )
                  }
                </span>
              </li>
            </ul>
        </>
      )}
    </section>
  )
}