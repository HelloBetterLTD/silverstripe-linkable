<input $AttributesHTML style='display: none'/>

<% if $Value > 0 %>
	$LinkObject &nbsp;
	<button type='button' href='#' class='linkfield-button btn btn-primary'><%t Linkable.EDIT 'Edit' %></button>
	<button type='button' href='#' class='linkfield-remove-button btn btn-danger '><%t Linkable.REMOVE 'Remove' %></button>
<% else %>
	<button type='button' href='#' class='linkfield-button btn btn-primary font-icon-plus-circled '><%t Linkable.ADDLINK 'Add Link' %></button>
<% end_if %>

<div class='linkfield-dialog'></div>
