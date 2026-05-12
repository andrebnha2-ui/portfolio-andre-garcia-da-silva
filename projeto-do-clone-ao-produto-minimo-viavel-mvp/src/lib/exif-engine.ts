import ExifReader from 'exifreader';

export interface MetadataResult {
  [key: string]: string | number | null;
}

export const extractMetadata = async (file: File): Promise<MetadataResult> => {
  try {
    const tags = await ExifReader.load(file);
    const result: MetadataResult = {};

    for (const [key, value] of Object.entries(tags)) {
      // Filter out binary data or complex objects for simple display
      if (value && typeof value.description === 'string') {
        result[key] = value.description;
      } else if (value && value.value !== undefined) {
        result[key] = String(value.value);
      }
    }

    return result;
  } catch (error) {
    console.error('Error extracting metadata:', error);
    throw new Error('Não foi possível ler os metadados deste arquivo.');
  }
};

export const extractMetadataFromUrl = async (url: string): Promise<MetadataResult> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Falha ao buscar a imagem da URL.');
    
    const blob = await response.blob();
    const file = new File([blob], 'remote-image', { type: blob.type });
    
    return await extractMetadata(file);
  } catch (error) {
    console.error('Error fetching/extracting metadata from URL:', error);
    throw new Error('Não foi possível acessar a imagem ou extrair metadados da URL fornecida.');
  }
};
