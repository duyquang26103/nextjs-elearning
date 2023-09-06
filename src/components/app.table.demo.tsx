'use client'

import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowsProp,
    GridToolbarContainer,
} from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import {randomId,} from '@mui/x-data-grid-generator';
import {toast} from "react-toastify";
import {mutate} from "swr";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}
function EditToolbar(props: EditToolbarProps) {
    const {setRows, setRowModesModel} = props;
    const [ id, setId ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ age, setAge ] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);

    const handleCreateItem = () => {
        // setId(randomId())
        setRows((oldRows) => {
            const res = fetch('http://localhost:8000/persons',
            {
                method: "POST",
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id, lastName, firstName, age})
            }).then(res => res.json()).then(res => {
            if (res) {
                mutate('http://localhost:8000/persons');
            }
        })
            console.log(res)
            // if(res.status === 200) {
                return [...oldRows, {id, lastName, firstName, age, isNew: true}];
            // }
        });
        setRowModesModel((oldModel) => {
            return {
            ...oldModel,
            [id]: {mode: GridRowModes.View, fieldToFocus: 'name'},
        }});
        toast.info("Save successfully!");
        handleClose();
    }

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon/>} onClick={() => {setOpen(true); setId(randomId())}}>
                Add record
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component="form">
                    <FormControl variant="standard">
                        <InputLabel htmlFor="my-input">Id</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" value={id} disabled={true}/>
                    </FormControl>
                    <br/>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="my-input">Last Name</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" onChange={(event) => setLastName(event.target.value)} />
                    </FormControl>
                    <br/>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="my-input">First</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" onChange={(event) => setFirstName(event.target.value)}/>
                    </FormControl>
                    <br/>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="my-input">Age</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" onChange={(event) => setAge(event.target.value)}/>
                    </FormControl>
                    <br/>
                    <Button onClick={handleCreateItem}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </GridToolbarContainer>
    );
}

interface IProps {
    persons: IPerson[]
}

export default function TableComponentsDemo(props: IProps) {
    const [rows, setRows] = React.useState(props.persons);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id: GridRowId) => () => {
        toast.info("Save successfully!");
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        toast.info("Delete successfully!");
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow?.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        // @ts-ignore
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'id', width: 80, editable: true, align: 'center', headerAlign: 'center'},
        {
            field: 'lastName',
            headerName: 'lastName',
            type: 'string',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'firstName',
            headerName: 'firstName',
            type: 'string',
            width: 180,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'age',
            type: 'string',
            width: 80,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 180,
            cellClassName: 'actions',
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key={id}
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            key={id}
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={id}
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={id}
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    // @ts-ignore
    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: {setRows, setRowModesModel},
                }}
            />
        </Box>
    );
}
