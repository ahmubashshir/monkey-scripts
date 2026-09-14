# _plugins/user_script_metadata.rb

module UserAsset
  module SiteAttrs
    attr_accessor :userscripts, :userstyles
  end

  module SiteDrop
    def userscripts
      @obj.userscripts if @obj.respond_to?(:userscripts)
    end

    def userstyles
      @obj.userstyles if @obj.respond_to?(:userstyles)
    end
  end
  Jekyll::Drops::SiteDrop.prepend(SiteDrop)

  Asset = Data.define(
    :name,
    :namespace,
    :version,
    :description,
    :file,
    :type,
    :meta
  ) do
    def initialize(meta:, file:)
      super(
        name:        meta[:name],
        namespace:   meta[:namespace],
        version:     meta[:version],
        description: meta[:description],
        type:        meta[:type],
        file:        file,
        meta:        meta.except(*members)
      )
    end

    def to_liquid
      {
        "name"        => name,
        "namespace"   => namespace,
        "version"     => version,
        "description" => description,
        "file"        => file,
        "type"        => type,
        "meta"        => meta
      }
    end
  end

  class Generator < Jekyll::Generator
    safe true

    SCRIPT_DIRS = %w[_scripts _userjs js].freeze
    STYLE_DIRS  = %w[_styles _usercss css].freeze

    def generate(site)
      site.extend(SiteAttrs)

      site.data["userscripts"] = collect_metadata(
        site,
        SCRIPT_DIRS,
        "js",
        method(:parse_userscript_metadata)
      )
      site.userscripts = site.data["userscripts"]

      site.data["userstyles"] = collect_metadata(
        site,
        STYLE_DIRS,
        "css",
        method(:parse_usercss_metadata)
      )
      site.userstyles = site.data["userstyles"]
    end

    private

    def collect_metadata(site, dirs, extension, parser)
      site.static_files.filter_map do |file|
        next unless file.name.end_with?(".user.#{extension}")
        next unless dirs.any? { |dir| file.path.include?("/#{dir}/") }

        meta = parser.call(File.read(file.path))
        next unless meta

        Asset.new(meta: meta, file: file).to_liquid
      end
    end

    def parse_userscript_metadata(content)
      match = content.match(
        %r{//\s*==UserScript==\s*\n(?<metadata>.*?)//\s*==/UserScript==}m
      )
      return nil unless match

      parse_metadata_lines(match[:metadata]).merge(type: "script")
    end

    def parse_usercss_metadata(content)
      match = content.match(
        %r{
          /\*\s*
          (?:\*\s*)?==(?<type>UserCSS|UserStyle)==\s*\n
          (?<metadata>.*?)\n==/\k<type>==
          \s*\*/
        }mx
      )
      return nil unless match

      parse_metadata_lines(match[:metadata]).merge(type: "style")
    end

    def parse_metadata_lines(block)
      meta = {}

      block.each_line do |line|
        if line =~ /^\s*(?:\/\/|\*)?\s*@(\S+)\s+(.*?)\s*$/
          key = :"#{$1}"
          value = $2

          meta[key] ||= []
          meta[key] << value
        end
      end

      meta.transform_values do |values|
        values.size == 1 ? values.first : values
      end
    end
  end
end
