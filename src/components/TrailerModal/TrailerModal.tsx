import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC} from "react";

import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../../store";
import {Trailer} from "./Trailer";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const TrailerModal: FC = () => {
    const dispatch = useAppDispatch();
    const {trailerStatus} = useAppSelector(state => state.movies)
    const handleClose = () => dispatch(movieActions.setTrailerStatus(false));

    return (
        <div>
            <Modal
                open={trailerStatus}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Trailer/>
                </Box>
            </Modal>
        </div>
    );
};

export {TrailerModal};