declare module 'react-file-viewer' {
    interface FileViewerProps {
      filePath: string;
      fileType: string;
      errorComponent: React.ReactNode; // Or the specific component type
      onError: (error: Error) => void;
    }
  
    const FileViewer: React.FC<FileViewerProps>;
  
    export default FileViewer;
  }