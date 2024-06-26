export default function shuffleArray(array: number[]) {
    // Cria uma cópia do array para não modificar o original
    const shuffledArray = array.slice();
    
    // Algoritmo de Fisher-Yates para embaralhar o array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    
    return shuffledArray;
  }