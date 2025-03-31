document.getElementById('input-prefix').value='none'
document.getElementById('output-prefix').value='none'

// prefix name to number
function prefixNumber(quantity, prefix) {
	const binary={
		"T": 1024**4,
		"G": 1024**3,
		"M": 1024**2,
		"k": 1024,
		"none": 1,
	}
	
	const decimal={
		"G": 1000000000,
		"M": 1000000,
		"k": 1000,
		"h": 100,
		"da": 10,
		"none": 1,
		"d": 0.1,
		"c": 0.01,
		"m": 0.001,
		"μ": 0.000001,
		"n": 0.000000001,
	}

	if(quantity==binary) {
		return binary[prefix]
	}
	else {
		return binary[prefix]
	}
}

// convert function
function unitConvert(input, input_prefix, input_unit, output_prefix, output_unit) {
	let output
	// input-output key
	let key=`${input_unit}-${output_unit}`

	// unit factors
	const factors={
		// information
		'B-b': 8,
		'B-nib': 2,
		'b-B': 1/8,
		'b-nib': 1/4,
		'nib-B': 1/2,
		'nib-b': 4,
		// length
		'ft-m': 0.3048,
		'mi-m': 1609.344,
		'in-m': 0.0254,
		'm-ft': 1/0.3048,
		'm-mi': 1/1609.344,
		'm-in': 1/0.0254,
	}

	// if input and output prefixes and units are equal
	if(input_prefix==output_prefix && input_unit==output_unit) {
		output=input
	}
	else {
		if(input_unit==output_unit) {
			output=(input*prefixNumber(quantity, input_prefix))/prefixNumber(quantity, output_prefix)
		}
		else {
			output=(input*factors[key]*prefixNumber(quantity, input_prefix))/prefixNumber(quantity, output_prefix)
		}
	}

	return output
}

// input and output textboxes for feet-inches
function feetInches() {
	const input_unit=document.getElementById('input-unit').value
	const output_unit=document.getElementById('output-unit').value

	// for input textbox
	if(input_unit=='ftin') {
		document.getElementById('input-box').innerHTML=`
			Input:
			<input type='text' id='input'>
			<label for='input'>ft</label>
			<input type='text' id='input2'>
			<label for='input2'>in</label>
		`
	}
	else {
		document.getElementById('input-box').innerHTML=`
			<label for='input'>Input:</label>
			<input type='text' id='input'>
		`
	}
}

// select quantity
document.getElementById('quantity').addEventListener('change', function() {
	input_prefix=document.getElementById('input-prefix'), output_prefix=document.getElementById('output-prefix')
	input_unit=document.getElementById('input-unit'), output_unit=document.getElementById('output-unit')

	console.log("Quantity: " + this.value)

	// binary prefixes
	const binary=`
		<option value='T'>tera (2⁴⁰)</option>
		<option value='G'>giga (2³⁰)</option>
		<option value='M'>mega (2²⁰)</option>
		<option value='k'>kilo (2¹⁰)</option>
		<option value='none'>none (2⁰)</option>
	`
	// decimal prefixes
	const decimal=`
		<option value='G'>giga (10⁹)</option>
		<option value='M'>mega (10⁶)</option>
		<option value='k'>kilo (10³)</option>
		<option value='h'>hecto (10²)</option>
		<option value='da'>deca (10¹)</option>
		<option value='none'>none (10⁰)</option>
		<option value='d'>deci (10⁻¹)</option>
		<option value='c'>centi (10⁻²)</option>
		<option value='m'>milli (10⁻³)</option>
		<option value='μ'>micro (10⁻⁶)</option>
		<option value='n'>nano (10⁻⁹)</option>
	`

	// information units
	const information=`
		<option value='select'>select</option>
		<option value='b'>bits (b)</option>
		<option value='B'>bytes (B)</option>
		<option value='nib'>nibbles (nib)</option>
	`
	// length units
	const length=`
		<option value='select'>select</option>
		<option value='ft'>feet (ft)</option>
		<option value='ftin'>feet-inches (ft-in)</option>
		<option value='m'>metres (m)</option>
		<option value='mi'>miles (mi)</option>
	`
	// temperature units
	const temperature=`
		<option value='select'>select</option>
		<option value='celsius'>Celsius (C)</option>
		<option value='fahrenheit'>Fahrenheit (F)</option>
		<option value='kelvin'>Kelvin (K)</option>
	`

	if(this.value=='information') {
		input_prefix.innerHTML=binary
		output_prefix.innerHTML=binary
		input_prefix.value='none'
		output_prefix.value='none'

		input_unit.innerHTML=information
		output_unit.innerHTML=information
	}
	else if(this.value=='length') {
		input_prefix.innerHTML=decimal
		output_prefix.innerHTML=decimal
		input_prefix.value='none'
		output_prefix.value='none'

		input_unit.innerHTML=length
		output_unit.innerHTML=length
	}
	else if(this.value=='temperature') {
		input_prefix.innerHTML=decimal
		output_prefix.innerHTML=decimal
		input_prefix.value='none'
		output_prefix.value='none'
		
		input_unit.innerHTML=temperature
		output_unit.innerHTML=temperature
	}
	else {
		input_unit.innerHTML=`<option value='select'>select</option>`
		output_unit.innerHTML=`<option value='select'>select</option>`
	}
})

// select input unit
document.getElementById('input-unit').addEventListener('change', function() {
	const input=document.getElementById('input').value
	feetInches() // triggers ehrn changing from or to ftin
	console.log("Input unit: " + this.value)
	document.getElementById('input').value=input
})

// convert button
document.getElementById('convert').addEventListener('click', function() {
	let input=Number(document.getElementById('input').value), input2
	const input_prefix=document.getElementById('input-prefix').value, output_prefix=document.getElementById('output-prefix').value
	const input_unit=document.getElementById('input-unit').value, output_unit=document.getElementById('output-unit').value
	let output=0, output2=0 // outputs

	// if not input is given
	if(input==null) {
		input=0
	}

	if(input_unit=='ftin') {
		input2=Number(document.getElementById('input2').value)
		if(input2==null) {
			input2=0
		}
	}

	// from feet-inches
	if(input_unit=='ftin') {
		output=unitConvert(input, 'none', 'ft', output_prefix, output_unit)+unitConvert(input, 'none', 'in', output_prefix, output_unit)
	}
	// to feet-inches
	else if(output_unit=='ftin') {
		output=Math.round(unitConvert(input, input_prefix, input_unit, 'none', 'ft'))
		output2=Math.round(unitConvert(input, input_prefix, input_unit, 'none', 'in')%12)
	}
	//normal case
	else {
		output=unitConvert(input, input_prefix, input_unit, output_prefix, output_unit)
	}
	
	// temperature units
	// Celsius to Fahrenheit
	if(input_unit=='celsius' && output_unit=='fahrenheit') {
		output=(input*9/5)+32
	}
	// Celsius to Kelvin
	else if(input_unit=='celsius' && output_unit=='kelvin') {
		output=(input*100+27315)/100 // to avoid floating point issues
	}

	// Fahrenheit to Celsius
	else if(input_unit=='fahrenheit' && output_unit=='celsius') {
		output=(input-32)*5/9
	}
	// Fahrenheit to Kelvin
	else if(input_unit=='fahrenheit' && output_unit=='kelvin') {
		output=((input-32)*500/9+27315)/100
	}
	
	// Kelvin to Celsius
	else if(input_unit=='kelvin' && output_unit=='celsius') {
		output=(input*100-27315)/100 // to avoid floating point issues
	}
	// Kelvin to Fahrenheit
	else if(input_unit=='kelvin' && output_unit=='fahrenheit') {
		output=((input*100-27315)*9/500)+32
	}

	if(output_unit=='b') {
		output=Math.floor(output)
	}

	if(output_unit=='ftin') {
		document.getElementById('output').innerHTML=`
			Output: ${output} ft ${output2} in
		`
	}
	else {
		if(output_prefix=='none') {
			document.getElementById('output').innerHTML=`
				Output: ${output} ${output_unit}
			`
		}
		else {
			document.getElementById('output').innerHTML=`
				Output: ${output} ${output_prefix}${output_unit}
			`
		}
	}

	if(output_unit=='ftin') {
		document.getElementById('output2').value=output2.toString()
	}

	if(input_unit=='ftin') {
		console.log("Input: " + input + " ft " + input2 + " in ")
	}
	else {
		console.log("Input: " + input + " " + input_prefix + input_unit)
	}
	
	if(output_unit=='ftin') {
		console.log("Output: " + output + " ft " + output2 + " in ")
	}
	else {
		console.log("Output: " + output + " " + output_unit)
	}
})

// reverse units
document.getElementById('reverse').addEventListener('click', function() {
	const input_prefix=document.getElementById('input-prefix').value, output_prefix=document.getElementById('output-prefix').value
	const input_unit=document.getElementById('input-unit').value, output_unit=document.getElementById('output-unit').value

	document.getElementById('input-prefix').value=output_prefix
	document.getElementById('output-prefix').value=input_prefix

	document.getElementById('input-unit').value=output_unit
	document.getElementById('output-unit').value=input_unit

	if(document.getElementById('output-unit').value=='ftin') {
		feetInches()
	}
	console.log("Units are reversed")
})

// clear and reset
document.getElementById('clear').addEventListener('click', function() {
	document.getElementById('quantity').value='select'
	document.getElementById('input').value=''
	document.getElementById('output').innerHTML=''
	document.getElementById('input-prefix').value='none'
	document.getElementById('output-prefix').value='none'
	document.getElementById('input-unit').value='select'
	document.getElementById('output-unit').value='select'

	console.log("Cleared")
})