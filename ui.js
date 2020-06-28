module.exports = `
#  Ontology for user interface hints and forms
#
#  See also related: the Fresnel language
#
@prefix contact: <http://www.w3.org/2000/10/swap/pim/contact#>.
@prefix dc:  <http://purl.org/dc/elements/1.1/>.
@prefix doc: <http://www.w3.org/2000/10/swap/pim/doc#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix owl: <http://www.w3.org/2002/07/owl#>.
@prefix r: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix s: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix tt: <http://dig.csail.mit.edu/2010/issues/track#>.
@prefix ui: <http://www.w3.org/ns/ui#>.
@prefix : <http://www.w3.org/ns/ui#>.
@prefix wf: <http://www.w3.org/2005/01/wf/flow#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

@keywords is, of, a.

<> dc:title "An ontology for User Interface description, Hints and Forms.";
    dc:description """The User Interface ontology allows the definition
    of forms for processing RDF model data, and include a bootstrap form for
    editing forms. It allows user interface hints such as background colors,
    can be associated with objects and classes.
    """;
    dc:created 2010-08-07;
    dc:license <https://creativecommons.org/publicdomain/zero/1.0/>;
    dc:modified """$Date: 2020/03/22 16:53:21 $""";
    dc:author <https://www.w3.org/People/Berners-Lee/card#i>.

style a r:Property, owl:DatatypeProperty;
    s:label "style";
        prompt "CSS style";
    s:comment """Must be a valid CSS style string such as one could put in
        an HTML style attribute.  Depending on the user interface system, this can
        by given to individuals, classes or properties. It is up to a user interface
        which wants to draw on them to pick how it uses styles from which parts
        of the data it has.  For example, the style of a class may be picked
        to distinguish information about things in that class.""".

backgroundColor a r:Property, owl:DatatypeProperty;
    s:label "background color"@en;
        s:range ui:Color;
    s:comment """Must be a valid CSS color string such as one could put in
        an HTML style attribute.  This should be in the #xxxxxx form,
        (with 6 digits of hex)  so that it
        can work with Graphviz.""".

backgroundImage a r:Property, owl:DatatypeProperty;
    s:label "background image"@en;
    s:comment """URI or base64 representation of an image""".

color a r:Property, owl:DatatypeProperty;
    s:label "color"@en;
    s:range ui:Color;
    s:comment """Must be a valid CSS color string such as one could put in
        an HTML style attribute.  This should be in the #xxxxxx form,
        (with 6 digits of hex)  so that it
        can work with Graphviz.""".



sortPriority a r:Property, owl:DatatypeProperty;
        s:label "sort priority";
        s:range xsd:integer;
        s:comment """When individuals or classes must be sorted, then
        if they are given different values of sortPriority a user agent can
        use this as a hint to how to present information.""".

sortBy a r:Property;
        s:label "sort by";
        s:domain s:Class;
        s:range r:Property;
        s:comment """A property which typically is used to sort
        members of a given class.""".

seqeunce a r:Property;
    s:label "sequence number";
    s:range xsd:integer;
    s:comment """The sequence in which this item is arranged with repect to other parts.""".

initialProperties a r:Property;
        s:label "initial properties";
        s:domain s:Class;
        s:range r:List; # List of r:Property
        s:comment """A really simple way of enabling user interfaces to
            create new information about a class of things is to make a define of properties
            to be specified when a information about a new item
            ("New item" here means an item which the system
            does not have prvious information about yet,
            not an items which has just been created,
            like new friend as opposed to new baby)""";
            prompt "Properties to be specified for new ones".

tableProperties a r:Property;
        s:domain s:Class;
        s:label "table properties";
        s:range r:List; # List of r:Property
        s:comment """This  is a crude way of specifying a table-based
            view for objects of this class.""";
            prompt "Properties to be given in a default table view".

prompt  a r:Property;
        s:label "user prompt";
        s:comment """A string for the UI to use if the user needs a longer
        prompts than just a field name, the rdfs:label. """;
        ui:prompt "A longer prompt for a user inputting this property".


#  A Taxonomy of Field types

ui:Form owl:disjointUnionOf ( ui:ValueField  ui:Group ui:Choice ui:Classifier ui:Options ui:Multiple ui:Heading ui:Comment);
    s:comment """A form can be any type of single field, or typically a Group of several fields,
    including interspersed headings and comments.  """.
ui:Single owl:disjointUnionOf ( ui:ValueField  ui:Group ui:Choice ui:Classifier ui:Options ui:Heading ui:Comment).
ui:ValueField owl:disjointUnionOf ( ui:TextField ui:NumericField ui:ColorField ui:DateField ui:DateTimeField ui:PhoneField ui:EmailField).
ui:NumericField owl:disjointUnionOf (ui:BooleanField ui:TriStateField ui:IntegerField ui:DecimalField ui:FloatField).
# ui:Multiple owl:disjointUnionOf ( ui:ZeroOrMore ui:OneOrMore ).
ui:TextField owl:disjointUnionOf (ui:SingleLineTextField ui:MultiLineTextField).

ui:Form a s:Class; is s:subClassOf of ui:ValueField, ui:Group, ui:Choice,  ui:Heading, ui:Comment, ui:Classifier, ui:Options, ui:Multiple.
ui:Single a s:Class; is s:subClassOf of ui:ValueField, ui:Group, ui:Choice, ui:Heading, ui:Comment, ui:Classifier, ui:Options.
ui:ValueField a s:Class; is s:subClassOf of  ui:TextField, ui:NumericField, ui:ColorField, ui:DateField, ui:DateTimeField, ui:PhoneField, ui:EmailField.
ui:NumericField a s:Class; is s:subClassOf of ui:BooleanField, ui:TriStateField, ui:IntegerField, ui:DecimalField, ui:FloatField.
ui:TextField a s:Class; is s:subClassOf of ui:SingleLineTextField, ui:MultiLineTextField.

ui:Classifier a s:Class; s:label "classifier";
    s:comment """A classifier allows the user to select the type of an object.
    The possible types must be subclasses of some overall class, the "category".
    (Ideally, the superclass is also set up as the disjoint union of the subclasses,
    if they are disjoint.)

    The form normally stores the resulting classes using an rdf:type triple,
    but a different predicate can be used if required, so the classifier field
    needs is 'property' defined too.

    If the subclass selected itself is has subclasses defined, the user can
    recursively select from them in turn, as many levels as needed.""".

ui:property a r:Property; s:domain ui:Form; s:range r:Property;
    s:label "property to be stored"@en;
    s:comment """Many fields prompt for information about a given property of the subject.
    When field is filled in, this gives which property is written into the data.""".

ui:category  a r:Property; s:domain ui:Classifier; s:range s:Class;
    s:label "overall superclass"@en;
    s:comment """The superclass subclasses of which will be selected.""".

ui:dependingOn a r:Property; s:domain ui:Options; s:range r:Property;
    s:label "depending on"@en;
    s:comment """Many fields prompt for information about a given property of the subject""".

ui:for a r:Property; s:label "for"@en; s:comment "The value for which this case is selected.".
ui:use a r:Property; s:range ui:Form.

ui:part a r:Property; s:label "part"@en ; s:domain ui:Form; s:range ui:Form. # Used for Multiple field - the subform for each item
ui:parts a r:Property; s:label "parts"@en ; s:domain ui:Form; s:range r:Collection. # (of Forms) The ordered set of fields in a group
ui:ordered e r:Property; s:label "ordered"; s:range xsd:Boolean . # Could be useful for all kinds of things in future so not restricted to Multiple

ui:from a r:Property; s:domain ui:Choice; s:range r:Class;
    s:label "from"; ui:prompt "from what class".

ui:size a r:Property; s:domain ui:ValueField; s:range xsd:integer;
    s:label "size of field";
    ui:prompt "size of field in characters".

ui:maxLength a r:Property; s:domain ui:TextField; s:range xsd:integer;
    s:label "max length of value".

ui:minValue a r:Property; s:domain ui:ValueField; s:label "min".  # @@ range?
ui:maxValue a r:Property; s:domain ui:ValueField; s:label "max".

 ui:creationForm a r:Property; s:domain s:Class; s:range ui:Form;
    s:label "creation form";
    s:comment """A form which may be used to collect information about a
    hitherto locally undocumented instance instance of this class.""".

 ui:annotationForm a r:Property; s:domain s:Class; s:range ui:Form;
    s:label "annotation form";
    s:comment """A form which may be used to add more infromation to an
instance of this class which we know something about.  Anything from
adding just add one more fact, to adding a whole lot of information about a specific
facet of the thing.
""".


#############################################
#
# Form for editing Forms
#

FormForm a ui:Form;
    dc:title "Form for editing Forms";
    is ui:creationForm of Form;
    a ui:Group; ui:parts (FF1 FF2 FF3 FieldList) .

    FF1 ui:sequence 1; a ui:Heading;  ui:contents "Edit Form"@en .
    FF2 ui:sequence 2; a ui:SingleLineTextField; ui:property dc:title; ui:size 60 .
    FF3 ui:sequence 3; a ui:Comment;  ui:contents
        """To add a field to the form, press the plus at the bottom,
        and then select what sort of field you want."""@en; ui:style "background-color: #ffe;" .

    FieldList  ui:sequence 10; a ui:Multiple; ui:ordered true; ui:property ui:parts; ui:part FieldForm .

FieldForm a ui:Group;
    dc:title "Form for selecting a type of field";
    ui:parts (

        [ ui:sequence 1; a ui:Classifier; ui:property r:type; ui:category ui:Form]

        [ a ui:Options; ui:sequence 2; ui:dependingOn r:type;

            ui:case [ ui:for ui:TextField; ui:use [a ui:Group; ui:parts (
                [ a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label "property"; ui:from owl:DatatypeProperty]  # @@@ Needs inference on current web
                [ a ui:IntegerField; ui:property ui:size; ui:label "field size"; ui:min 1; ui:max 4096]
                [ a ui:IntegerField; ui:property ui:maxLength; ui:label "Max. length of string"; ui:min 1]
            )]];

            ui:case [ ui:for ui:IntegerField; ui:use [a ui:Group; ui:parts (
                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label "property"; ui:from owl:DatatypeProperty]
                [ ui:sequence 2; a ui:IntegerField; ui:property ui:min; ui:label "minimum value"]
                [ ui:sequence 3; a ui:IntegerField; ui:property ui:max; ui:label "maximum value"] ) ]];

            ui:case [ ui:for ui:DecimalField; ui:use [a ui:Group; ui:parts (
                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label "property"; ui:from owl:DatatypeProperty]
                [ ui:sequence 2; a ui:DecimalField; ui:property ui:min; ui:label "minimum value"]
                [ ui:sequence 3; a ui:DecimalField; ui:property ui:max; ui:label "maximum value"] )  ]];

            ui:case [ ui:for ui:FloatField; ui:use [a ui:Group; ui:parts (
                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label "property"; ui:from owl:DatatypeProperty]
                [ ui:sequence 2; a ui:FloatField; ui:property ui:min; ui:label "minimum value"]
                [ ui:sequence 3; a ui:FloatField; ui:property ui:max; ui:label "maximum value"] ) ]];

            ui:case [ ui:for ui:ColorField; ui:use [a ui:Group; ui:parts (
                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label "property"; ui:from owl:DatatypeProperty] )
            ]];

            ui:case [ ui:for ui:DateField; ui:use [a ui:Group; ui:parts (
                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label "property"; ui:from owl:DatatypeProperty]
                [ ui:sequence 2; a ui:DateField; ui:property ui:min; ui:label "min"]
                [ ui:sequence 3; a ui:DateField; ui:property ui:max ; ui:label "max"]
            ) ]];

            ui:case [ ui:for ui:DateTimeField; ui:use [a ui:Group; ui:parts (
                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label "property"; ui:from owl:DatatypeProperty]
                [ ui:sequence 2; a ui:DateTimeField; ui:property ui:min; ui:label "min"]
                [ ui:sequence 3; a ui:DateTimeField; ui:property ui:max ; ui:label "max"]
            ) ]];

            ui:case [ ui:for ui:EmailField; ui:use [a ui:Group; ui:parts (
                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label "property"; ui:from owl:ObjectProperty]
            ) ]];

            ui:case [ ui:for ui:PhoneField; ui:use [a ui:Group; ui:parts (
                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label "property"; ui:from owl:ObjectProperty]
            )]];

            ui:case [ ui:for ui:Group; ui:use FieldList];

            ui:case [ ui:for ui:Options; ui:use [a ui:Group; ui:parts (
                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:dependingOn; ui:label "depending on"; ui:from r:Property; ui:default r:type]
                [ ui:sequence 2; a ui:Multiple; ui:property ui:case; ui:part CaseForm]
                                ) ]];

            ui:case [ ui:for ui:Choice; ui:use [a ui:Group; ui:parts (
                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label "property";
                    ui:canMintNew true; ui:from owl:ObjectProperty]
                [ ui:sequence 2; a ui:Choice;  ui:canMintNew true; ui:property ui:from; ui:label "destination class";
                                    ui:from s:Class; ui:canMintNew true; ]
                [ ui:sequence 3; a ui:BooleanField; ui:property ui:canMintNew; # No class form yet
                            ui:label "user can add new"]
                [ ui:sequence 4; a ui:Choice;  ui:canMintNew true; ui:property ui:use; ui:label "Nested Form (if any)";
                            ui:from ui:Form; ui:optional true; ui:use FormForm] # @@ optional

            ) ]];

            ui:case [ ui:for ui:Classifier; ui:use [a ui:Group; ui:parts (
                [ ui:sequence 2; a ui:Comment; ui:contents """A classifier allows the user to which classes the item belongs to, given a common superclass of the allowed classes.  Give the superclass here:""" ]

                [ ui:sequence 4; a ui:Choice;  ui:canMintNew true; ui:property ui:category; ui:label "superclass"; ui:from s:Class]

                [ ui:sequence 6; a ui:Comment; ui:contents """(When the choice is made normally the item is given a rdf:type. Set this to rdf:type unless you want the form to set a different property.)""" ]

                [ ui:sequence 8; a ui:Choice;  ui:canMintNew true; ui:property ui:property;
                        ui:label "property"; ui:from owl:ObjectProperty; ui:default r:type] # @@ restriction

            ) ]];

            ui:case [ ui:for ui:Multiple; ui:use [a ui:Group; ui:parts (
                        [ui:sequence 0; a ui:BooleanField;  ui:property ui:ordered; ui:label "ordered"] # If this an ordered array or an unordered set?
                        [ui:sequence 0; a ui:IntegerField;  ui:property ui:min; ui:label "minimum number"] # If this an ordered array or an unordered set?
                        [ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label "property"; ui:from r:Property]
                [ui:sequence 2; a ui:Choice;  ui:canMintNew true; ui:property ui:part; ui:from ui:Form; ui:use FieldForm]   # Form for details of the field part of the multiple
            ) ]];

            ui:case [ ui:for ui:Heading; ui:use [a ui:SingleLineTextField; ui:property ui:contents]];

            ui:case [ ui:for ui:Comment; ui:use [a ui:MultiLineTextField; ui:property ui:contents]]
        ]).


CaseForm a ui:Group;
   dc:title "Form for a conditional case in a form";
   ui:parts (
        [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:for; ui:label "when it is"; ui:canMintNew true; ui:from s:Class]
        [ui:sequence 2; a ui:Choice;  ui:canMintNew true; ui:property ui:use; ui:from ui:Form; ui:canMintNew true; ui:use FieldForm] ). # Form for details of the field part of the multiple

# ENDS
`
