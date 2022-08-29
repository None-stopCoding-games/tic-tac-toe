import React, { useEffect, useReducer, useState } from 'react';
import Square, { Cell } from './Square';

export default function App() {
    const [field, updateField] = useReducer(fieldReducer, initialField);
    const [player, togglePlayer] = useState(true);

    useEffect(() => {
        const game = checkGameStatus(field, player);
        if (game.status) {
            if (game.status === 'winner') {
                alert(`Победа за ${game.player ? 'Первым' : 'Вторым'} игроком!`);
            } else if (game.status === 'draw') {
                alert('Ничья :( ');
            }

            updateField({ isRestart: true });
            togglePlayer(true);
        } else {
            togglePlayer(!player);
        }
    }, [field]);

    return (
        <div className="tt-container">
            {
                field.map(
                    (row, x) => (
                        <div style={styles.fieldRow} key={x}>
                            { row.map((cell, y) =>
                                <Square key={y}
                                        value={ cell }
                                        onClick={ () => updateField({ x, y, player }) }/>
                            ) }
                        </div>
                    )
                )
            }
        </div>
    );
}

type GameStatus = 'winner' | 'draw' | null;
type Field = Array<Array<Cell>>;
type ReducerParams = {
    x?: number,
    y?: number,
    player?: boolean,
    isRestart?: boolean
};

const styles = {
    fieldRow: {
        display: 'flex'
    }
}

const initialField: Field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function fieldReducer(curField: Field, { player, x = 0, y = 0, isRestart }: ReducerParams): Field {
    if (isRestart) {
        return initialField;
    }

    const field = [...curField];
    if (field[x][y] === 0) {
        field[x][y] = player ? 1 : -1;
    }

    return field;
}

function checkGameStatus(field: Field, player: boolean): { status: GameStatus, player?: boolean } {
    const searchCells = player ? 1 : -1;
    const possibleLines = [
        // горизонтальные линии
        ...[0, 1, 2].map(
            xIndex => [0, 1, 2].map(
                yIndex => ({ x: xIndex, y: yIndex })
            )
        ),
        // вертикальные линии
        ...[0, 1, 2].map(
            yIndex => [0, 1, 2].map(
                xIndex => ({ x: xIndex, y: yIndex })
            )
        ),
        // диагонали
        [0, 1, 2].map(index => ({ x: index, y: index })),
        [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }]
    ];

    const hasWinner = possibleLines.some(
        line => line.every(
            ({ x, y }) => field[x][y] === searchCells
        )
    );

    return hasWinner ? {
        status: 'winner',
        player
    } : hasDraw(field) ? {
        status: 'draw'
    } : {
        status: null
    }
}

const hasDraw = (field: Field) => field.every(row => row.every(cell => cell));
