import {FC, PropsWithChildren} from "react";
import Switch from "react-switch";

import {useTheme} from "../../hoc";

interface IProps extends PropsWithChildren {

}

const Switcher: FC<IProps> = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div>
            <Switch
                onColor="#eeeeee"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
                checked={theme === 'dark'} onChange={toggleTheme} />
        </div>
    );
};

export {Switcher};