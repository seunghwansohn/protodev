import { connect, useSelector, useDispatch }    from 'react-redux';

const dialogOpened                  = useSelector(state => state.dialogs.opened)

export const checkOpened1 = () => {
    return dialogOpened
}