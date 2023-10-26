'use client'

interface ImageComponentProps {
    fileKey: string;
}

export default function KintoneImage(props : ImageComponentProps) {
    const imageUrl = `http://localhost:4000/images/${props.fileKey}`;
    return <img
        src={imageUrl}
        alt="Kintone Image"
        style={{width: '60%'}} width={'100'} height={'200'}
    />;
};