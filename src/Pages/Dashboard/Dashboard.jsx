import React, { useState } from 'react'
import styles from './Dashboard.module.css';
import Document from '../../components/Document/Document';
function Dashboard() {

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [editingDocument, setEditingDocument] = useState(null);

  const createNewDocument = () => {
    setDocuments([...documents, { name: 'Document Name', content: '' }]);
    setSelectedDocument(documents.length);
  };
  const handleDocumentClick = (index) => {
    if (index !== selectedDocument) {
      setSelectedDocument(index);
      setEditingDocument(null);
    }
  };

  const handleEditButtonClick = (index) => {
    setEditingDocument(editingDocument === index ? null : index);
  };

  const handleDocumentNameChange = (index, newName) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].name = newName;
    setDocuments(updatedDocuments);
  };
  return (
    <div className={styles.dashboard}>
      <div className={styles.left}>
      <button onClick={createNewDocument}>Add</button>
         {documents.map((doc, index) => (
          <div
            key={index}
            className={`${styles.docfile} ${index === selectedDocument ? styles.selected : ''}`}
            onClick={() => handleDocumentClick(index)}
            
          >
           {index === editingDocument ? (
              <input
              className={styles.nameInput}
                type="text"
                value={doc.name}
                onChange={(e) => handleDocumentNameChange(index, e.target.value)}
                onBlur={() => setEditingDocument(null)} // Hide input on blur
              
              />
            ) : (
              <div>{doc.name}</div>
            )}
             <button onClick={() => handleEditButtonClick(index)}>Edit</button>
          </div>
          
        ))}
      </div>
      <div className={styles.right}>
        <div className={styles.rightcontent}>
          {selectedDocument !== null && (
            <Document
              documentIndex={selectedDocument}
              documents={documents}
              setDocuments={setDocuments}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard