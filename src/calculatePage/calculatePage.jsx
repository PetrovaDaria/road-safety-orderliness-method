import React from 'react';
import b from 'b_';
import './calculatePage.css';

import { calculateEntropy } from '../lib/helper';
import Introduction from "../introduction/introduction";

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
        calculateEntropy({
            population: 1547418,
            auto: 670249,
            accidents: 1277,
            injured: 1755,
            dead: 155
        });
        const { entropy } = this.state;
        const hasResult = entropy !== '';

        return (
            <div className={this.class()}>
                <header className={this.class('header')}>
                    <h1 className={this.class('title')}>
                        Методика оценки организованности процесса обеспечения БДД на уровне субъекта Федерации
                    </h1>
                </header>
                <main className={this.class('main')}>
                    <Introduction />
                   {this._renderComponents()}
                   {this._renderButtons()}
                   {hasResult && this._renderResult()}
                </main>
            </div>
        );
    }

    _renderComponents = () => {
        return (
            <div className={this.class('components')}>
                {this.components.map(component => (
                    <React.Fragment
                        key={component}
                    >
                        <label htmlFor={component}>
                            {this.processedLabels[component]}
                        </label>
                        <input
                            id={component}
                            onChange={this._onChangeInput(component)}
                            value={this.state[component]}
                        />
                    </React.Fragment>
                ))}
            </div>
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
                {this._renderCalculateButton()}
                {this._renderResetButton()}
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
                Рассчитать энтропию
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
        return (
            <div className={this.class('result')}>
                {`Энтропия равна ${entropy}. Это ${level} (для 2019 г.) уровень организованности систем ОБДД.`}
            </div>
        );
    }

    _getLevel = entropy => {
        if (entropy < 0.7) {
            return 'относительно низкий';
        }
        if (entropy > 0.741) {
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
