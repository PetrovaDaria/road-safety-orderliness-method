import React from 'react';
import b from 'b_';
import './calculatePage.css';

import { calculateEntropy } from '../lib/helper';
import Introduction from "../introduction/introduction";
import MathJax from 'react-mathjax';

export default class CalculatePage extends React.Component {
    state = {
        population: '',
        auto: '',
        accidents: '',
        injured: '',
        dead: '',
        entropy: ''
    };

    components = ['population', 'auto', 'accidents', 'injured', 'dead'];
    labels = {
        population: { major: 'Население', minor: 'чел.' },
        auto: { major: 'Парк транспортных средств', minor: 'ед.' },
        accidents: { major: 'Количество ДТП', minor: 'ед./год' },
        injured: { major: 'Пострадавшие в ДТП', minor: 'чел./год' },
        dead: { major: 'Погибшие в ДТП', minor: 'чел./год' }
    };

    _processLabels = () => {
        return Object.entries(this.labels)
            .reduce((acc, [key, { major, minor }]) => {
            acc[key] = (
                <span>
                {`${major}, `}
                    <span className='minor-text'>
                        {minor}
                    </span>
                </span>
            );
            return acc;
        }, {});
    }

    processedLabels = this._processLabels();

    class = b.with('calculate-page');

    render() {
        const { entropy } = this.state;
        const hasResult = entropy !== '';

        return (
            <div className={this.class()}>
                <header className={this.class('header')}>
                    <h1 className={this.class('title')}>
                        Методика оценки организованности процесса обеспечения БДД на уровне субъекта Российской Федерации, города
                    </h1>
                    <p className={this.class('author')}>Петров А.И.</p>
                </header>
                <main className={this.class('main')}>
                    <Introduction />
                   {this._renderForm()}
                   {this._renderButtons()}
                   {hasResult && this._renderResult()}
                </main>
            </div>
        );
    }

    _renderForm = () => {
        return (
            <React.Fragment>
                <h2 className={this.class('form-title')}>Расчет относительной энтропии</h2>
                <div className={this.class('form')}>
                    {this.components.map(component => (
                        <React.Fragment
                            key={component}
                        >
                            <label htmlFor={component}>
                                {this.processedLabels[component]}
                            </label>
                            <input
                                id={component}
                                type="text"
                                onChange={this._onChangeInput(component)}
                                value={this.state[component]}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </React.Fragment>
        );
    }

    _onChangeInput = type => event => {
        const value = event.target.value;
        const isInt = Number.isInteger(parseInt(value, 10));
        const isPositive = value > 0;
        const isEmpty = value === '';
        if ((isInt && isPositive) || isEmpty) {
            this.setState({ [type]: value });
        }
    }

    _hasAllValues = () => {
        return this.components.filter(component => this.state[component] === '').length === 0;
    }

    _renderButtons = () => {
        return (
            <div className={this.class('buttons')}>
                {this._renderResetButton()}
                {this._renderCalculateButton()}
            </div>
        )
    }

    _renderCalculateButton = () => {
        const isDisabled = !this._hasAllValues();

        return (
            <button
                className={this.class('btn')}
                onClick={this._calculateEntropy}
                disabled={isDisabled}
            >
                Рассчитать
            </button>
        );
    }

    _renderResetButton = () => {
        return (
            <button
                className={this.class('btn')}
                onClick={this._reset}
            >
                Сбросить
            </button>
        );
    }

    _renderResult = () => {
        const { entropy } = this.state;
        const level = this._getLevel(entropy);
        return Number.isNaN(entropy)
            ?
            (
                <div className={this.class('result')}>
                    Невозможно вычислить
                </div>
            )
            :
        (
            <React.Fragment>
                <div className={this.class('result')}>
                    {`Относительная энтропия равна ${entropy}. Это `}
                    <span className="major-text">{`${level} `}</span>
                    (для 2019 г.) уровень организованности систем ОБДД.
                </div>
                {this._renderResultTable()}
            </React.Fragment>
        );
    }

    _renderResultTable = () => {
        return (
            <React.Fragment>
                <h3 className={this.class('result-table-title')}>Уровень организованности систем ОБДД (для 2019 г.)</h3>
                <MathJax.Provider>
                    <div className={this.class('result-table')}>
                        <span>Высокий</span>
                        <span>Средний</span>
                        <span>Низкий</span>
                        <MathJax.Node formula={'H_n > 0.7'} />
                        <MathJax.Node formula={'0.7 \\leq H_n \\leq 0.74'} />
                        <MathJax.Node formula={'H_n > 0.74'} />
                    </div>
                </MathJax.Provider>
            </React.Fragment>
        );
    }

    _getLevel = entropy => {
        if (entropy > 0.741) {
            return 'относительно низкий';
        }
        if (entropy < 0.7) {
            return 'относительно высокий';
        }
        return 'средний';
    }

    _reset = () => {
        Object.keys(this.state).forEach(key => {
            this.setState({ [key]: '' });
        })
    }

    _calculateEntropy = () => {
        const entropy = calculateEntropy(this.state);

        this.setState({ entropy });
    }
}
