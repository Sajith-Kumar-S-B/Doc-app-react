import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './Document.css';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../AuthProvider';
import { firestore } from '../../firebase';
import { toast } from 'react-toastify';

function Document({ documentIndex, documents, setDocuments,setSelectedDocument,darkMode }) {
  const { currentUser } = useAuth();
    const module = {
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      };
      const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
       
      ];
      const [name, setName] = useState('');
      const [content, setContent] = useState('');
      useEffect(() => {
        console.log(documents);
        // Load content from the selected document

        const { name, content } = documents[documentIndex] || { name: '', content: '' };

        setName(name);
        setContent(content);
      }, [documentIndex, documents]);
    
      // const handleSave = () => {
      //   const updatedDocuments = [...documents];
      //   updatedDocuments[documentIndex] = { name, content };
      //   setDocuments(updatedDocuments);
      //   localStorage.setItem("text", content);
      //   alert("Document saved!");
      // };
      const handleSave = async () => {
        if (currentUser) {
          const updatedDocuments = [...documents];
          updatedDocuments[documentIndex] = { ...updatedDocuments[documentIndex], name, content };
    
          // Update the document in Firestore
          const documentsCollection = collection(firestore, `users/${currentUser.uid}/documents`);
          const documentToUpdate = doc(documentsCollection, updatedDocuments[documentIndex].id);
          await updateDoc(documentToUpdate, { name, content });
    
          setDocuments((prevDocuments) => {
            const updatedDocuments = [...prevDocuments];
            updatedDocuments[documentIndex] = { ...updatedDocuments[documentIndex], name, content };
            return updatedDocuments;
          });
          toast.success('Document saved!');
          setTimeout(()=>{
            setSelectedDocument(null)
          },1000)
       

        }
      };


      const handleBack = ()=>{
        setSelectedDocument(null)
      }


      
      
  return (
    <div className={`container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <ReactQuill
        className='ql-toolbar'
        theme="snow"
         value={content}
         onChange={(value) => {
          console.log(value);
          setContent(value);
        }}
        modules={module}
        formats={formats}
      />
      <div className='buttons'>
        <button  onClick={() => handleSave(content)}  className='saveBtn'>Save</button>
        <button onClick={handleBack}   className='saveBtn'>Back</button>
      </div>



    </div>
  )
}

export default Document