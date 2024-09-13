'use client';

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { DocumentEditor } from '@onlyoffice/document-editor-react';
import CryptoJS from 'crypto-js';

const DocumentEditorComponent = forwardRef<
  any,
  { selectedTemplate: { file: string; id: string } }
>(({ selectedTemplate }, ref) => {
  const editorRef = useRef<any>(null);

  const baseUrl = 'https://api-talentnesia.skwn.dev/';
  const doc = `api/v1/certificate/show_template/${selectedTemplate.file}`;
  const date = Date.now();
  const key = `${date}-${selectedTemplate.id}`;
  const cb =
    'https://api-talentnesia.skwn.dev/api/v1/certificate/save_template';
  const options = {
    width: '100%',
    height: '550px',
    type: 'desktop',
    documentType: 'word',
    document: {
      title: 'Talentnesia',
      url: `${baseUrl}${doc}`,
      fileType: 'docx',
      key: key,
      info: {
        owner: 'TEO',
        uploaded: '1724058508252',
      },
      permissions: {
        download: true,
        edit: true,
        review: true,
      },
    },
    editorConfig: {
      mode: 'edit',
      lang: 'en',
      user: {
        id: 'ae2933ff986fa41e316b87a368d5caf8',
        name: 'Administrator',
      },
      callbackUrl: cb,
      customization: {
        about: true,
        feedback: true,
        goback: {
          url: '',
        },
      },
    },
  };

  const base64UrlEncode = (input: string) => {
    return btoa(input)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const generateJWT = (options: object, secretkey: string) => {
    const header = { alg: 'HS256', typ: 'JWT' };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(options));

    const signature = CryptoJS.HmacSHA256(
      `${encodedHeader}.${encodedPayload}`,
      secretkey,
    )
      .toString(CryptoJS.enc.Base64)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  };
  const secretkey = process.env.NEXT_PUBLIC_ONLYOFFICE_SECRET_KEY || '';
  const token = generateJWT(options, secretkey);

  const onDocumentReady = () => {
    console.log('Document is loaded');
  };

  const onLoadComponentError = (
    errorCode: number,
    errorDescription: string,
  ) => {
    console.error(`Error ${errorCode}: ${errorDescription}`);
  };

  const documentServerUrl = process.env.NEXT_PUBLIC_ONLYOFFICE_SERVER_URL || '';
  return (
    <DocumentEditor
      // ref={editorRef}
      id="docxEditor"
      documentServerUrl={documentServerUrl}
      config={{ ...options, token }}
      events_onDocumentReady={onDocumentReady}
      onLoadComponentError={onLoadComponentError}
    />
  );
});

DocumentEditorComponent.displayName = 'DocumentEditorComponent';

export default DocumentEditorComponent;
