module.exports.checkRequiredFields = (requiredFields) => {
        return (req, res, next) => {
          const fields = Object.keys(req.body);
            fields.sort()
            requiredFields.sort()
            if(JSON.stringify(fields) === JSON.stringify(requiredFields)){
              next();
            }else {
            return res.status(400).json({
              error: 'request body malformed',
            });
          }
        };
      };
      

  