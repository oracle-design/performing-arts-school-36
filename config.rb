###
# Compass
###

# Change Compass configuration
# using :nested for develop & :compressed for production <==========
compass_config do |config|
  config.output_style = :nested
  config.line_comments = false
end

###
# slim config
###

# Indent html for pretty debugging and do not sort attributes
Slim::Engine.set_default_options :pretty => true, :sort_attrs => false

###
# Page options, layouts, aliases and proxies
###

# Default layout
page "/*", layout: "application"

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Asset paths
set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'img'
set :fonts_dir,  "fonts"


# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# i18n
# activate :i18n, :langs => [:zh_TW, :en]

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
helpers do
  def nav_link(link_text, url, options = {})
    options[:class] ||= ""
    options[:class] << " active" if url == current_page.url
    link_to(link_text, url, options)
  end
end

# Build-specific configuration
configure :build do

  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # optimizing images
  activate :imageoptim

  # Or use a different image path
  # set :http_prefix, "/Content/images/"

end
