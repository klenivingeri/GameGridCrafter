import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext'
import { Modal } from './Modal'

const PuzzleImage = () => {
  const { imageSrc, setCountMove, countMove, time, grid } = useUser()

  const [modalOpen, setModalOpen] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [successGrid, setSuccessGrid] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  console.log('aaaaaa', grid)
  const totalTiles = grid.columns * grid.rows;

  const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleTileClick = (index, grid) => {
    if (successGrid == index) {
      window.navigator.vibrate(20);
    }

    if (selectedTile === null) {
      setSelectedTile(index);
    } else {
      setCountMove(countMove + 1)
      const newTiles = [...tiles];
      [newTiles[selectedTile], newTiles[index]] = [newTiles[index], newTiles[selectedTile]];
      setTiles(newTiles);
      setSelectedTile(null);

      // Verifica se todas as peças estão no lugar correto
      const finish = newTiles.every((tile, i) => tile.originalId === i)
      setIsComplete(finish)

      if (finish) {
        time.handlePause()
        setTimeout(() => {
          setModalOpen(true)
        }, 2000);
      }
    }
    setSuccessGrid(grid)
  };

  const handleContextMenu = (e) => {
    e.preventDefault(); // Impede o menu de contexto de abrir
  };

  useEffect(() => {
    if (imageLoaded && imageSrc) {
      const generatedTiles = Array.from({ length: totalTiles }, (_, index) => {
        const col = index % grid.columns;
        const row = Math.floor(index / grid.columns);
        return {
          id: index, // posição atual (será embaralhada)
          originalId: index, // posição correta
          col,
          row,
          style: {
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${grid.columns * 100}% ${grid.rows * 100}%`,
            backgroundPosition: `${(col / (grid.columns - 1)) * 100}% ${(row / (grid.rows - 1)) * 100}%`,
          },
        };
      });

      const shuffled = shuffle(generatedTiles);
      setTiles(shuffled);
    }
  }, [imageLoaded, imageSrc, grid]);

  return (
    <div className="flex flex-col items-center p-4 gap-4 select-none text-white">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Olá, mundo!</h2>
        <p>Este é um modal simples com Tailwind.</p>
      </Modal>
      {isComplete
        ? <img src={imageSrc} />
        : imageSrc && imageLoaded
          ? (
            <div className={`relative max-w-[90vw]`}>
              <img
                src={imageSrc}
                alt="puzzle"
                className="w-full h-auto block"
              />
              <div
                className="absolute inset-0 grid"
                style={{
                  gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
                  gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
                }}
              >
                {tiles.map((tile, index) => (
                  <div
                    key={index}
                    onClick={() => tile.id == index ? null : handleTileClick(index, tile.id)}
                    onContextMenu={handleContextMenu}
                    style={{
                      ...tile.style,
                      border: selectedTile === index
                        ? '2px solid red'
                        : tile.id == index
                          ? ''
                          : '1px solid white',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )
          : (
            <>
              <img
                src={imageSrc}
                onLoad={() => {
                  time.handleStart()
                  setImageLoaded(true)
                }}
                className="w-[0px] h-[0px]"
              />
              <span className='text-white'>Carregando imagem...</span>
            </>
          )
      }
    </div>
  );
};

export default PuzzleImage;
