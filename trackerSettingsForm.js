export const trackerSettingsFormText = `
@prefix : <http://www.w3.org/ns/ui#> .
@prefix core: <http://www.w3.org/2005/01/wf/flow#>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix owl: <http://www.w3.org/2002/07/owl#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix ui: <http://www.w3.org/ns/ui#> .
@prefix vcard: <http://www.w3.org/2006/vcard/ns#>.
@prefix wf: <http://www.w3.org/2005/01/wf/flow#> .

  core:TrackerSettingsForm     a :Form;
     <http://purl.org/dc/elements/1.1/title> "Tracker Configuration Form";
     :parts  (

      [   a ui:Heading;  ui:contents "About the tracker"@en ]

      [ a :SingleLineTextField;
                 :label "Title of issue tracker";
                 :maxLength "128";
                 :property dct:title;
                 :size "40" ]

      [ a :MultiLineTextField; :label "Description"; :property wf:description; :size "40" ]

      [ a ui:Choice;  ui:canMintNew true; ui:use core:SuperClassForm; ui:follow true;
          ui:property  wf:issueClass;
          ui:label "What states can an issue be in?";
          ui:from rdfs:Class;
          ui:default wf:Task ]

      [   a ui:Comment;  ui:contents """You can optionally sort issues using (one or more) classification systems"""@en ]


      [ a ui:Choice;  ui:canMintNew true;  ui:use core:ClassificationForm;
          ui:property  wf:issueCategory; ui:label "Sort them into which category?"; ui:from rdfs:Class ]

      [ a :BooleanField;
              :label "Allow issues to have sub-issues";
              :property wf:allowSubIssues;
              :default false ]

      [ a ui:Heading;  ui:contents "Table view:"@en ]

      [ a ui:Comment;  ui:contents "Any extra properties to include?"@en ]


    [a ui:Multiple; ui:property wf:propertyList; ui:ordered true; ui:part core:PropertyForm; ui:follow true ]

      [ a ui:Heading;  ui:contents "Details of issues"@en ]

      # Use a people picker ideally
      [ a ui:Choice;  ui:canMintNew true; ui:use core:GroupForm;
          ui:property wf:assigneeGroup;
          ui:label "Assign issues to people from which group?";
          ui:from vcard:Group;
          ]

       # Optionally one form for extras

       [ a ui:Choice;  ui:canMintNew true; ui:use ui:FormForm;
           ui:property wf:extrasEntryForm;
           ui:label "Other things to save about each issue?";
           ui:from ui:Form;
           ]


    ) .

    # Form for the superclass of all states
    # @@ also We must require each state class to be stated to be a subclass of EITHER Open OR Closed.
    core:SuperClassForm a ui:Form; dct:title "Form for managing states";
      ui:parts (
        [ a :SingleLineTextField;
                   :label "Name of set of states";
                   :defualt "States";
                   :maxLength "128";
                   :property rdfs:label;
                   :size "40" ]
          [a ui:Multiple; ui:property owl:disjointUnionOf; ui:ordered true; ui:part core:StateForm ]
  #      [ a ui:Multiple; ui:property rdfs:subClassOf; ui:reverse true; ui:part core:StateForm ]
    ) .

    core:StateForm a ui:Form; dct:title "Form for one state";
      ui:parts (
                [ a :SingleLineTextField;
                         :label "Name of state";
                         :maxLength "128";
                         :property rdfs:label;
                         :size "40" ]
                 [ a :ColorField; :label "Background color"; :property :backgroundColor ]
                  # @@ add icon for state

                 ).


    # Form for Classification

    core:ClassificationForm a ui:Form; dct:title "Form for a classification by categpry";
      ui:parts (
        [ a :SingleLineTextField;
                   :label "Name of classification:";
                   :maxLength "128";
                   :property rdfs:label;
                   :size "40" ]
         [a ui:Multiple; ui:property owl:disjointUnionOf; ui:ordered true; ui:part core:CategoryForm ]
    ) .

    core:CategoryForm a ui:Form; dct:title "Form for a category";
      ui:parts (
                [ a :SingleLineTextField;
                         :label "Name of category";
                         :maxLength "128";
                         :property rdfs:label;
                         :size "40" ]
                 [ a :ColorField; :label "Background color"; :property :backgroundColor ]

                 ).

   core:PropertyForm a ui:Form; ui:parts ( # Internded for raed only only marking the
     [ a :SingleLineTextField;
                :label "(property name)";
                :maxLength "128";
                :property rdfs:label;
                :size "40" ]
     ).


    # Other ontology stuff we are otherwis missing

    # we can usde ui:label to give a decent abel when the ontology uses a really bad one
    rdfs:subClassOf ui:label "super class" .
    # We can also add a specific nice label for the inverse
    [] owl:inverse rdfs:subClassOf; rdfs:label "sub class" .
    owl:disjointUnionOf ui:label "option" .

    # Form for new group


    core:GroupForm a ui:Form; dct:title "Form for new contacts group"; ui:parts (
      [ a :SingleLineTextField;
                 :label "Name of new group";
                 :maxLength "128";
                 :property vcard:fn;
                 :size "60" ]

      [ a ui:Heading;  ui:contents "Members of group"@en ]

      [ a ui:Multiple; ui:label "contacts in group"; ui:property vcard:member; ui:part core:PersonForm ]

      ).

  core:PersonForm a ui:Form; dct:title "New contact details form"; ui:parts (

  [ a :NamedNodeURIField; ui:label "Solid ID"; ui:property owl:sameAs; ui:size 60 ]

  [ a :SingleLineTextField;
             :label "Name of contact";
             :maxLength "128";
             :property vcard:fn;
             :size "60" ]

  [ a ui:PhoneField; :label "Phone"; :property vcard:phone; ] # @@ check property]

  [ a :EmailField; :label "Email"; :property vcard:email ] # @@ check property

 ).

# classificattion owl:disjointUnionOf ()
        wf:Tracker     :creationForm core:SettingsForm .
`
