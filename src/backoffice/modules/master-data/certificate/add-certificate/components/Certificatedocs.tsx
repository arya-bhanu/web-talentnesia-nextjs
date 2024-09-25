import React, { useEffect, useState } from 'react';
import { DocumentEditor } from "@onlyoffice/document-editor-react";
import CryptoJS from 'crypto-js';

const AddDocumentEditorComponent: React.FC<{ id?: string; url?: string;  }> = ({ id, url }) => {
  const [config, setConfig] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const baseUrl = "https://api-talentnesia.skwn.dev/";
    const date = Date.now();
    const doc = url 
    const key = `${date}-${id}`; 
    const cb = "https://api-talentnesia.skwn.dev/api/v1/certificate/save_template";

    const options = {
      width: "100%",
      height: "550px",
      type: "desktop",
      documentType: "word",
      document: {
        title: "Talentnesia",
        url: `${baseUrl}${doc}`,
        fileType: "docx",
        key: key,
        info: {
          owner: "TEO",
          uploaded: date.toString(),
        },
        permissions: {
          download: true,
          edit: true,
          review: true,
        },
      },
      editorConfig: {
        mode: "edit",
        lang: "en",
        user: {
          id: "ae2933ff986fa41e316b87a368d5caf8",
          name: "Administrator",
        },
        callbackUrl: cb,
        customization: {
          about: true,
          feedback: true,
          goback: {
            url: "",
          },
        },
      },
      events: {
        
      },
    };

    const secretkey = process.env.NEXT_PUBLIC_ONLYOFFICE_SECRET_KEY || '';
    const token = generateJWT(options, secretkey);

    setConfig({ ...options, token });
    setError(null);

    return () => {
      const editorContainer = document.getElementById('docxEditor');
      if (editorContainer) {
        editorContainer.innerHTML = '';
      }
    };
  }, [id, url]);


  const base64UrlEncode = (input: string) => {
    return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  const generateJWT = (options: object, secretkey: string) => {
    const header = { alg: "HS256", typ: "JWT" };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(options));
    const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, secretkey)
      .toString(CryptoJS.enc.Base64)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  const documentServerUrl = process.env.NEXT_PUBLIC_ONLYOFFICE_SERVER_URL || '';

  return (
    <>
      {config && (
        <DocumentEditor
          id="docxEditor"
          documentServerUrl={documentServerUrl}
          config={config}
          events_onDocumentReady={() => console.log("Document is loaded")}
          onLoadComponentError={(errorCode, errorDescription) => {
            console.error(`Error ${errorCode}: ${errorDescription}`);
            setError(`Failed to load document: ${errorDescription}`);
          }}
        />
      )}
    </>
  );
};

export default AddDocumentEditorComponent;
