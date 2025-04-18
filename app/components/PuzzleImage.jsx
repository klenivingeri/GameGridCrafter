import React, { useState, useEffect } from 'react';
import { ButtonExpand } from './ButtonExpand'


const PuzzleImage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const columns = 3;
  const rows = 3;
  const totalTiles = columns * rows;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleTileClick = (index) => {
    if (selectedTile === null) {
      setSelectedTile(index);
    } else {
      const newTiles = [...tiles];
      [newTiles[selectedTile], newTiles[index]] = [newTiles[index], newTiles[selectedTile]];
      setTiles(newTiles);
      setSelectedTile(null);

      // Verifica se todas as peças estão no lugar correto
      const finish = newTiles.every((tile, i) => tile.originalId === i)
      setIsComplete(finish)

      if (finish) {
        setTimeout(() => {
          alert('🎉 Puzzle completo!');
        }, 100);
      }
    }
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
  }, [imageLoaded, imageSrc]);

  return (
    <div className="flex flex-col items-center p-4 gap-4 select-none">
      <ButtonExpand />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
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
                    onClick={() => tile.id == index ? null : handleTileClick(index)}
                    onContextMenu={handleContextMenu}
                    style={{
                      ...tile.style,
                      border: selectedTile === index ? '2px solid red' : '1px solid white',
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
