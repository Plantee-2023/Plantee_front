import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const StoreEditor = ({ form, setForm }) => {

    const onChangeContent = (data) => {
        setForm({
            ...form,
            contents: data
        });
    }

    const onClickSave = async () => {
        if (form.contents === "") {
            alert("내용을 입력해주세요.");
        } else {
            if (window.confirm("저장하시겠습니까?")) {
                const data = { contents: form.contents };
                //console.log(data);
                await axios.post("/store/insert", data);
                alert("저장을 완료했습니다.");
            }
        }
        window.location.href = `/store`;
    }

    return (
        <>
            <CKEditor config={{ ckfinder: { uploadUrl: '/store/ckupload' } }}
                editor={ClassicEditor}
                data={form.contents}
                onChange={(event, editor) => { onChangeContent(editor.getData()); }} />
        </>
    )
}

export default StoreEditor