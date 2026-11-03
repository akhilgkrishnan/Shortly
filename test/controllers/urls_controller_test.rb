# frozen_string_literal: true

require "test_helper"

class UrlsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @visitor_token = "visitor_123"
    @headers = { "X-Visitor-Token" => @visitor_token }
  end

  test "list urls scoped to current visitor or all" do
    Url.create!(
      long_url: "https://facebook.com", short_url: "https://sample.com/test1", slug: "test1",
      visitor_token: @visitor_token)
    Url.create!(
      long_url: "https://google.com", short_url: "https://sample.com/test2", slug: "test2",
      visitor_token: "other_visitor")

    get urls_url, headers: @headers
    assert_response :success
    assert_equal 1, response.parsed_body["urls"].length

    get urls_url, params: { scope: "all" }, headers: @headers
    assert_response :success
    assert_equal 2, response.parsed_body["urls"].length
  end

  test "create shortened url assigns current visitor token" do
    assert_difference "Url.count", 1 do
      post urls_url, params: { url: { long_url: "https://github.com" } }, headers: @headers
    end
    assert_response :success
    assert_equal "URL Successfully Shortened", response.parsed_body["notice"]
    assert_equal @visitor_token, Url.last.visitor_token
  end

  test "show increments total clicks and unique clicks on first visit" do
    url = Url.create!(
      long_url: "https://wikipedia.org", short_url: "https://sample.com/wiki123", slug: "wiki123",
      visitor_token: @visitor_token)
    assert_equal 0, url.click_count
    assert_equal 0, url.unique_clicks

    get "/#{url.slug}"
    assert_redirected_to url.long_url
    assert_equal 1, url.reload.click_count
    assert_equal 1, url.unique_clicks

    # Second visit by same user with cookie: total increments, unique stays 1
    get "/#{url.slug}"
    assert_redirected_to url.long_url
    assert_equal 2, url.reload.click_count
    assert_equal 1, url.unique_clicks
  end

  test "show returns 404 for nonexistent slug" do
    get "/nonexistentslug"
    assert_response :not_found
    assert_equal ["URL not found"], response.parsed_body["errors"]
  end

  test "update toggles is_pinned for owner" do
    url = Url.create!(
      long_url: "https://news.ycombinator.com", short_url: "https://sample.com/hn123", slug: "hn123",
      is_pinned: false, visitor_token: @visitor_token)
    put url_url(url.slug), params: { url: { is_pinned: true } }, headers: @headers
    assert_response :success
    assert_equal true, url.reload.is_pinned
  end

  test "update rejected for unauthorized visitor" do
    url = Url.create!(
      long_url: "https://news.ycombinator.com", short_url: "https://sample.com/hn123", slug: "hn123",
      is_pinned: false, visitor_token: @visitor_token)
    put url_url(url.slug), params: { url: { is_pinned: true } }, headers: { "X-Visitor-Token" => "attacker_token" }
    assert_response :forbidden
    assert_equal false, url.reload.is_pinned
  end

  test "destroy deletes url for owner" do
    url = Url.create!(
      long_url: "https://news.ycombinator.com", short_url: "https://sample.com/del123", slug: "del123",
      visitor_token: @visitor_token)
    assert_difference "Url.count", -1 do
      delete url_url(url.slug), headers: @headers
    end
    assert_response :success
    assert_equal "URL Successfully Deleted", response.parsed_body["notice"]
  end

  test "destroy rejected for unauthorized visitor" do
    url = Url.create!(
      long_url: "https://news.ycombinator.com", short_url: "https://sample.com/del123", slug: "del123",
      visitor_token: @visitor_token)
    assert_no_difference "Url.count" do
      delete url_url(url.slug), headers: { "X-Visitor-Token" => "attacker_token" }
    end
    assert_response :forbidden
  end

  test "index serializes safe fields and owned flag without leaking visitor_token" do
    url1 = Url.create!(
      long_url: "https://facebook.com", short_url: "https://sample.com/test1", slug: "test1",
      visitor_token: @visitor_token)
    url2 = Url.create!(
      long_url: "https://google.com", short_url: "https://sample.com/test2", slug: "test2",
      visitor_token: "other_visitor")

    get urls_url, params: { scope: "all" }, headers: @headers
    assert_response :success

    urls = response.parsed_body["urls"]
    assert_equal 2, urls.length
    assert_nil response.parsed_body["visitor_token"]

    urls.each do |u|
      assert_nil u["visitor_token"]
      assert u.key?("owned")
    end

    my_link = urls.find { |u| u["slug"] == url1.slug }
    other_link = urls.find { |u| u["slug"] == url2.slug }
    assert_equal true, my_link["owned"]
    assert_equal false, other_link["owned"]
  end

  test "create rejects javascript or invalid schemes" do
    post urls_url, params: { url: { long_url: "javascript:alert(1)//http://foo.bar" } }, headers: @headers
    assert_response :unprocessable_entity
    assert_includes response.parsed_body["errors"].join(" "), "valid HTTP or HTTPS URL"
  end

  test "visitor token is read from encrypted cookie when headers not provided" do
    cookies.encrypted[:visitor_token] = "cookie_visitor_456"
    post urls_url, params: { url: { long_url: "https://rubyonrails.org" } }
    assert_response :success
    assert_equal "cookie_visitor_456", Url.last.visitor_token
  end
end
