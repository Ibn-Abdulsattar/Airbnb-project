module.exports = (fnx) => {
return function(req, res, next){
    fnx(req, res, next).catch(next);
}
};