import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../Firebase/Firebase';

const useStorage = (file) => {
  
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection('images');
    
    storageRef.put(file).on('state_changed', async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        await collectionRef.add({ url, createdAt });
        setUrl(url);
    }, (err) => {
      setError(err);
    });
  }, [file]);

  return { url, error };
}

export default useStorage;