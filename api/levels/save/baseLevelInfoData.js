function main(leveldata) {
    let dirs = leveldata.split("</d><k>LLM_02</k>")[0].split("<d><k>_isArr</k><t /><k>k_0</k>")[1].split("<k>k_");
    let levels = [dirs[0]];
    for (let i = 1; i < dirs.length; i++) {
        dirs[i] = dirs[i].split(i + "</k>");
        dirs[i].shift();
        levels.push(dirs[i].join(i + "</k>"));
    }
    return levels;
}

module.exports = main;