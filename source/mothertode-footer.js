//============//
// MotherTode //
//============//
{
	Habitat.MotherTode.scope = {MotherTode: {}}
	
	const scope = Habitat.MotherTode.scope.MotherTode
	const Term = Habitat.Term
	
	//========//
	// Source //
	//========//
	scope.Source = Term.emit(
		Term.list([
			Term.term("Term", scope),
			Term.eof,
		]),
		([{output}]) => output,
	)
	
	//======//
	// Term //
	//======//
	scope.Term = Term.or([
		Term.term("StringLiteral", scope),
		Term.term("RegExpLiteral", scope),
		Term.term("TermReference", scope),
	])
	
	//========//
	// Basics //
	//========//
	scope.Letter = Term.regExp(/[a-zA-Z_$]/)
	scope.TermName = Term.many(Term.term("Letter", scope))
	
	//===========//
	// Primitive //
	//===========//
	scope.StringLiteral = Term.emit(
		Term.list([
			Term.string('"'),
			Term.maybe(Term.many(Term.regExp(/[^"]/))),  //"
			Term.string('"'),
		]),
		([left, inner, right]) => `Term.string(\`${inner}\`)`
	)
	
	scope.RegExpLiteral = Term.emit(
		Term.list([
			Term.string('/'),
			Term.maybe(Term.many(Term.regExp(/[^/]/))),
			Term.string('/'),
		]),
		([left, inner, right]) => `Term.regExp(/${inner}/)`
	)
	
	scope.TermReference = Term.emit(
		Term.term("TermName", scope),
		(name) => `Term.term(\`${name}\`, scope)`
	)
	
}
