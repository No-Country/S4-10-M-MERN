const filterObject = (obj, ...allowedFields) => {

	const newObj = {};

	Object.keys(obj).forEach(el => {
		if (allowedFields.includes(el)) {
			newObj[el] = obj[el]; // newObj.title = obj.title
		}
	});

	return newObj;
};

// module.exports = { filterObject };
export default filterObject
