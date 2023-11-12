import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css';
import Document from '../../components/Document/Document';
import {useAuth} from '../../AuthProvider'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import gifImg from '../../Assets/15-13-39-266_512.gif';
import { useDarkMode } from '../../ModeContext';
import { toast } from 'react-toastify';
function Dashboard() {

  const {currentUser} = useAuth();
  const { darkMode } = useDarkMode();

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  
  const [editingDocument, setEditingDocument] = useState(null);



  useEffect(() => {
    // Fetch documents when the component mounts
    if (currentUser) {
      const fetchDocuments = async () => {

        try{const documentsCollection = collection(firestore, `users/${currentUser.uid}/documents`); // Use the user's UID as the collection name
        const documentsSnapshot = await getDocs(documentsCollection);
        const documentsData = documentsSnapshot.docs.map((doc) => ({
          id: doc.id,
         ...doc.data(),
          
        }));
        setDocuments(documentsData);
      }catch (error) {
        console.log("Error fetching documents:", error);
      }
      };

      fetchDocuments();
    }
  }, [currentUser]);


  // const createNewDocument = () => {
  //   setDocuments([...documents, { name: 'Document Name', content: '' }]);
  //   setSelectedDocument(null);
  // };

  const createNewDocument = async () => {
    if (currentUser) {
      const newDocument = { name: 'Document Name', content: 'Enter Your Content & Save.' };

      // Add the new document to Firestore
      const documentsCollection = collection(firestore, `users/${currentUser.uid}/documents`);
      const newDocumentRef = await addDoc(documentsCollection, newDocument);

      setDocuments([...documents, { id: newDocumentRef.id, ...newDocument }]);
      setSelectedDocument(null);
      toast.info("New Document Added")

    }
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
    const documentIdToUpdate = updatedDocuments[index].id;
    const documentRef = doc(firestore, `users/${currentUser.uid}/documents`, documentIdToUpdate);
    updateDoc(documentRef, { name: newName });
    setDocuments(updatedDocuments);
  };



  const handleDeleteButtonClick = async(index) => {
    const updatedDocuments = [...documents];
    const documentIdToDelete = updatedDocuments[index].id
    await deleteDoc(doc(firestore, `users/${currentUser.uid}/documents`, documentIdToDelete));
    updatedDocuments.splice(index, 1);

    setSelectedDocument(null)
    setDocuments(updatedDocuments);
    setEditingDocument(null); 
     toast.error("document deleted")   
  };




  return (
    <div className={`${styles.dashboard} ${darkMode ? styles['dark-mode'] : styles['light-mode'] }`}>
      <div className={styles.left}>
         {documents.map((doc, index) => (
          <div
            key={index}
            className={`${styles.docfile} ${index === selectedDocument ? styles.selected : ''}`}
            
            
          >
           {editingDocument === index ? (
              <input
              key={doc.id}
              className={styles.nameInput}
                type="text"
                value={doc.name}
                onChange={(e) => handleDocumentNameChange(index, e.target.value)}
                onBlur={() => setEditingDocument(null)} // Hide input on blur
              
              />
            ) : (
              <div onClick={() => handleDocumentClick(index)}>{doc.name}</div>
            )}
            <div>
               <EditIcon fontSize='10px' onClick={() => handleEditButtonClick(index)}/>
               <DeleteOutlineIcon onClick={() => handleDeleteButtonClick(index)}/>
            </div>
          </div>
          
        ))}
      </div>
      <div className={styles.right}>
        <div className={styles.rightcontent}>
          {selectedDocument !== null ? (
            <Document
            darkMode={darkMode}
              documentIndex={selectedDocument}
              documents={documents}
              setSelectedDocument={setSelectedDocument}
              setDocuments={setDocuments}
            />
          ):<div className={styles.newDocument}>
           
            <img onClick={createNewDocument}   src={gifImg} alt="" />
            <h5 className={styles.textAdd}> <AddCircleIcon fontSize='large' className={styles.newDoc} onClick={createNewDocument}/>
Add New Document</h5>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard