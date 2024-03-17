import React, { useRef, useState, useEffect } from 'react';
import sideImage1 from "../assets/sidelogo.avif";
import { uploadFile } from './Service';

const FileShare = () => {
    // File store state...
    const [file, setFile] = useState('');
    const [result, setResult] = useState('');

    // Manipulate virtual dom using ref...
    const fileInputRef = useRef();

    // Send file for server...
    useEffect(() => {
        const getFile = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await uploadFile(data);
                setResult(response.path);

                // Set a timer to clear the result after 10 seconds
                setTimeout(() => {
                    setResult('');
                }, 120000); // 2 minutes in milliseconds
            }
        }

        getFile();
    }, [file])

    // Target dom elements...
    const onClickUpload = () => {
        fileInputRef.current.click();
    }

    return (
        <div className='Cover'>
            <div className='sideImage'>
                <img src={sideImage1} alt='SideImage not loaded' />
            </div>

            <div className='mainContent'>
                <div className='FileCode'>
                    <h1>File-Sharing Application..!!!</h1>
                    <p>Upload file and share downloaded Link...</p>
                    <input type='file' ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} hidden />
                    <button onClick={() => onClickUpload()}>Upload File</button>
                    <div className='result'>
                        {result && (
                            <div>
                                <h3>Download File :</h3><a href={result} target='_blank'>{result}</a>
                                <p>Link will expire in 2 seconds</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileShare;
