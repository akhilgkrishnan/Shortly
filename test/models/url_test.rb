# frozen_string_literal: true

require "test_helper"

class UrlTest < ActiveSupport::TestCase
  def setup
    @url = Url.new(long_url: "https://google.com")
  end

  test "should not be valid, if long_url is nil or empty" do
    @url.long_url = ""
    assert @url.invalid?
  end

  test "count the number of urls" do
    assert_difference ["Url.count"] do
      Url.create(long_url: "https://google.com", short_url: "https://sample.com/test", slug: "test")
    end
  end

  test "count the number of urls, when more than one" do
    assert_difference ["Url.count"], 2 do
      Url.create(long_url: "https://facebook.com", short_url: "https://sample.com/test1", slug: "test1")
      Url.create(long_url: "https://google.com", short_url: "https://sample.com/test2", slug: "test2")
    end
  end

  test "should not create multiple entry with same long url" do
    Url.create(long_url: "https://facebook.com", short_url: "https://sample.com/test1", slug: "test1")
    Url.create(long_url: "https://facebook.com", short_url: "https://sample.com/test2", slug: "test2")

    assert_equal Url.all.count, 1
  end
end
