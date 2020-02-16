import React from 'react';
import MathJax from 'react-mathjax';

import './introduction.css';

export default class Introduction extends React.Component {
    chain = `P \\rightarrow N_{Vh} \\rightarrow N_{RA} \\rightarrow N_V \\rightarrow N_D`;
    render() {
        return (
            <MathJax.Provider>
                <div className="introduction">
                    <p>
                        Формирование дорожно-транспортной аварийности с позиций
                        кибернетической процессной логики описывается
                        четырехзвенной <MathJax.Node inline formula="H_n\text{-}4" /> причинно-следственной цепочкой:
                    </p>
                    <p>
                        <MathJax.Node formula={this.chain}/>
                    </p>
                    <ul className="list">
                        <li className="list-item">
                            <MathJax.Node inline formula="P"/> - численность населения в рамках определенной территории (от Population – население)
                        </li>
                        <li className="list-item">
                            <MathJax.Node inline formula="N_{Vh}"/> - количество транспортных средств (ТС) в парке (от Vehicle – транспортное средство)
                        </li>
                        <li className="list-item">
                            <MathJax.Node inline formula="N_{RA}"/> - количество ДТП, произошедших за определенный период в рамках автотранспортной системы,
                            соответствующей  определенной территории (от Road Accidents – дорожное происшествие);
                        </li>
                        <li className="list-item">
                            <MathJax.Node inline formula="N_V"/> - количество (для указанной системы) пострадавших в ДТП (от Victim – жертва)
                        </li>
                        <li className="list-item">
                            <MathJax.Node inline formula="N_D"/> - количество (для указанной системы) погибших в ДТП (от Dead – погибший)
                        </li>

                    </ul>
                </div>
            </MathJax.Provider>
        );
    }
}
