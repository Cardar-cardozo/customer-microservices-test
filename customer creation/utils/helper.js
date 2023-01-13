export const execute = async (command, inputs = [], outputs = []) => {
    return run('execute', command, inputs, outputs);
};
