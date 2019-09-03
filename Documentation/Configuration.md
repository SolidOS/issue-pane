# Issue Tracker configuration

The Solid issue tracker system, `issue-pane`, is a very flexible system which can
be configured for many different needs.  Therefore, understanding the
format of the configuration file is important, as currently, there is no
User Interface support for a user to configure a new tracker herself.

The words 'issue' and 'task' may be used interchangeably in this document and in the
software. Note that you may end up using the tracker for things where you don't think of them as
"issues" - they may be requests for hand-made craft items, To-Dos, meals to be organized, and so on.

From the user's point of view, an issue tracker basically is a list of issues and a tool for editing the details of an issue.

To make an instance of tracker on a solid pod, just create the main config file
and go to the URI of the tracker in a browser, and the data bowser will run the code you
need.  Other solid-compatible tracker tools may also be built to use the same data.

The classes and properties in this document at in the Workflow namespace.

    @prefix wf: <http://www.w3.org/2005/01/wf/flow#>.

You may find other namespaces useful, such as

    @prefix cal: <http://www.w3.org/2002/12/cal/ical#>.
    @prefix link: <http://www.w3.org/2007/ont/link#>.
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
    @prefix owl: <http://www.w3.org/2002/07/owl#>.
    @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
    @prefix foaf: <http://xmlns.com/foaf/0.1/>.
    @prefix doap: <http://usefulinc.com/ns/doap#>.
    @prefix ui: <http://www.w3.org/ns/ui#>.
    @prefix dc: <http://purl.org/dc/elements/1.1/>.
    @prefix vcard: <http://www.w3.org/2006/vcard/ns#>.


Typically, (and currently) a tracker has one config file,  say `index.ttl`
one file to actually store the state of all the issues, say `state.ttl`,
and optionally one file to store chat messages, say `chat.ttl` if you don't
want them to be in the same file as the issues themselves.

You should *create empty files* for the state and chat file.
Then create the tracker config file and you are done.

Your config file will start by defining the Tracker object itself.

A common way is to create a new Solid folder for the tracker,
and in that make the config file `index.ttl` and the tracker object
`index.ttl#this` . Then the solid file bowser will display the folder as
a tracker object. So let's do that in this example.


        @prefix : <#>.    # Local identifiers use default namespace
        :this a wf:Tracker;
             dc:title "Issue Tracker for the Foo project" ;
             wf:stateStore <state.ttl> ;
             wf:messageStore <chat.ttl> .


##  Defining possible issue states

An issue is always in one of a number of states, like Open or Closed, for a simple system,
for a more complex one, say, New, Assigned, InProgress, Pending External Feedback, Rejected, Done.
Moving an issue from one state to another is the most fundamental thing users do.
The RDFS Class system is used for the issue state.

The simplest way is to just use the predefined class `wf:Task`.
It is defined in the ontology to have two subclasses, `wf:Open` and `wf:Closed`.

    :this wf:stateClass wf:Task;
       wf:initialState wf:Open .


The more complex way is to defined your own state classes.

  - Define a superclass, say `FooIssue`
  - Define each subclass as being subclasses of `FooIssue`
  - Declare the superclass to be  a disjoint union of the subclasses.  That means that a task can only be in one at a time.
  - For some, but not all, of your subclasses, define them to be a subclass of `wf:Open`.  These will be the open issues. By default, only open issues are displayed.
  - Optionally, define a `ui:backgroundColor` for each subclass to make them stand out from each other.

### Example

        :this wf:stateClass :FooIssue ;
            wf:initialState :New.

        :FooIssue a s:Class; s:subClassOf wf:Task;
            s:label "Request";
            owl:disjointUnionOf (
                :New :Discussing :Pending :Negotiating :Accepted :Urgent :ToBeDeclined
                :Declined :Obsolete :Done ).

        :New a s:Class; s:subClassOf :FooIssue, wf:Open; s:label "new"; ui:sortOrder 90;
            s:comment """Has not been looked at.
            This is the initial state normally when an issue is created.""".
        :Discussing a s:Class; s:subClassOf :FooIssue, wf:Open; s:label "in discussion"; ui:sortOrder 80;
            s:comment "Being discussed".
        :Pending a s:Class; s:subClassOf :FooIssue, wf:Open; s:label "pending others"; ui:sortOrder 75;
            s:comment "Waiting for an external person's input.".
        :Negotiating a s:Class; s:subClassOf :FooIssue, wf:Open; s:label "negotiating"; ui:sortOrder 60;
            s:comment "Being negotiated".
        :Accepted a s:Class; s:subClassOf :FooIssue, wf:Open; s:label "Accepted, in progress"; ui:sortOrder 50;
            s:comment "Will go ahead. We are working on this".
        :Urgent a s:Class; s:subClassOf :FooIssue, wf:Open; s:label "URGENT"; ui:sortOrder 55;
            s:comment "Needs urgent attention".
        :ToBeDeclined a s:Class; s:subClassOf :FooIssue, wf:Open; s:label "to be declined"; ui:sortOrder 40;
            s:comment "To be declined".
        :Declined a s:Class; s:subClassOf :FooIssue, wf:Closed; s:label "declined"; ui:sortOrder 30;
            s:comment "Declined".
        :Done a s:Class; s:subClassOf :FooIssue, wf:Closed; s:label "done"; ui:sortOrder 20;
            s:comment "Completed.".
        :Obsolete a s:Class; s:subClassOf :FooIssue, wf:Closed; s:label "obsolete/missed"; ui:sortOrder 10;
            s:comment "Overtaken by time or events.".


(Note that the classes must be explicitly subclasses of (indirectly) wf:Task
as solid-ui/rdflib and maybe others are not smart enough to deduce that from the
owl:disjointUnionOf.)

## Defining categories

Depending on what sort of application the tracker is being used  for,
it may be useful to categorize issues along one or more axes.
 For example, they could be classified by the sort of issue, between
 Urgent Fix, Bug, Enhancement Request, Blue Sky Idea.
The could be classified by domain, such as Sales, Marketing, or Engineering,
or product line, and so on.

A category is defined as a set of disjoint classes used in the issue state above, but then
specified using the `issueCategory` property.   


      :this wf:issueCategory :BugType, :Division .

This will generate two columns, one for Bug Type, and one for Division, in the issue list.

## Nested issues

You can run the tracker in a mode in which
issues can have sub-issues.
There is a button on each issue to create sub-issues, and
a list of sub-issues.  You can turn this on with a boolean flag:

    :this wf:allowSubIssues true .

## What's in an issue?

Any issue will have, anyway:

 - A title
 - A text description
 - Its creation date
 - its state, like Open/Closed.
 - a text status field about it
 - A small chat thread
 - a place to drag related things like web pages

### Predicate List

You can also add to this in two ways. One is with an arbitrary list of other properties to be displayed in the table


      :this wf:propertyList ( dc:title  ex:location ) .

### Extras entry form

The other is by defining a form to be added to the issue editor


      :this wf:extrasEntryForm  :FooDetailsForm .


 See [Instructions for creating forms](https://solid.github.io/solid-ui/Documentation/forms-intro.html)


## Managing Assignees

Optionally, the tracker will let you assign tasks to people.
(Or groups, organizations, etc, but typically people).

To make this happen, you can define the set of people
who can potentially be assigned in either or both
of two ways:

### Assignee project:

Mention in the config file that a DOAP project has the tracker as its bug tracker.


          :FooProject doap:bug-database :this .

In the project's rdf document (which may be the same as the tracker or may be different)
give (at least) the developers and their names.


          :FooProject doap:developer  :Alice, :Bob, :Charlie .
          :Alice foaf:name "Alice Accacia".
          :Bob foaf:name "Bob Brown".
          :Charlie foaf:name "Robert Crimson".


### Assignee group (new, untested)

You can create or link to VCARD group of people.
The group must specify the people linked by `vcard:member`


        :this  wf:assigneeGroup :Devs .
          :Devs a vcard:Group; vcard:fn "The dream team";
                vcard:member :Alice, :Bob, :Charlie .
                :Alice foaf:name "Alice Accacia".
                :Bob foaf:name "Bob Brown".
                :Charlie foaf:name "Robert Crimson".


You can have more than one assignee group.
You can have an associated project, with its developers, as well.
All the developers mentioned will be available to be allocated to issues.


## History

This issue tracker originally was basically a copy pf the functionality of Roundup https://en.wikipedia.org/wiki/Roundup_(issue_tracker)
a python-based configurable issue tracker we were using before for the group. Roundup is, for example, used for the python language itself.

## Future

Currently (2019-09) there is no user interface tooling for guiding the user through
the task of creating a new tracker.  This would clearly be valuable! @@ link to issue.
Help would be great in making that.

Other use

The current method of storing all the issues in one file works for small projects
but clearly doesn't scale with size or time.  A plan is to use a `issueURITemplate`
to allow issues to placed in subfolders by date, or timestamp, etc.

A virtual tracker is a tracker which aggregates a view of several different tracker
would be valuable, for example to aggregate all the issues I have been assigned to,
whichever of the projects
