import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext'
import { Modal } from './Modal'

const PuzzleImage = () => {
  const { imageSrc, setCountMove, countMove, time } = useUser()

  const [modalOpen, setModalOpen] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [successGrid, setSuccessGrid] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const columns = 3;
  const rows = 3;
  const totalTiles = columns * rows;

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
        }, 1000);
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
        const col = index % columns;
        const row = Math.floor(index / columns);
        return {
          id: index, // posição atual (será embaralhada)
          originalId: index, // posição correta
          col,
          row,
          style: {
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${columns * 100}% ${rows * 100}%`,
            backgroundPosition: `${(col / (columns - 1)) * 100}% ${(row / (rows - 1)) * 100}%`,
          },
        };
      });

      const shuffled = shuffle(generatedTiles);
      setTiles(shuffled);
    }
    time.handleStart()
  }, [imageLoaded, imageSrc]);


  return (
    <div className="flex flex-col items-center p-4 gap-4 select-none text-white">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Olá, mundo!</h2>
        <p>Este é um modal simples com Tailwind.</p>
      </Modal>
      {isComplete
        ? <img src={imageSrc} />
        : imageSrc && (
          <div className={`relative max-w-[90vw]`}>
            <img
              src={imageSrc}
              alt="puzzle"
              onLoad={() => setImageLoaded(true)}
              className="w-full h-auto block"
            />

            {imageLoaded && (
              <div
                className="absolute inset-0 grid"
                style={{
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gridTemplateRows: `repeat(${rows}, 1fr)`,
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
                  >{tile.id == index ? tile.id + 1 : null}</div>
                ))}
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default PuzzleImage;
