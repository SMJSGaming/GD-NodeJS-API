module.exports = {
    setvalue: (string, params) => {
        for (let i = 1; i < Object.keys(params).length; i++)
            string = string.replace(`value${i}`, params[`value${i}`]);
        return string;
    },
    IsValidJson: (checkstr) => {
        try {
            return JSON.parse(checkstr);
        } catch(error) {
            return null;
        }
    }
}