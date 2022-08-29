import React from 'react';

export type Cell = -1 | 0 | 1;

interface ISquareOptions {
    value: Cell;
    onClick: (e: React.MouseEvent) => void
}

export default function Square({ value = 0, onClick }: ISquareOptions) {
    return (
        <div style={ styles.container } onClick={ onClick }>
            { value === 1
                ? <img src="/images/cross.png" alt="cross" width={ 100 } height={ 100 } />
                : value === -1
                    ? <img src="/images/zero.png" alt="zero" width={ 100 } height={ 100 } />
                    : ''
            }
        </div>
    );
}

const styles = {
    container: {
        border: '1px solid green',
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3px'
    }
}
